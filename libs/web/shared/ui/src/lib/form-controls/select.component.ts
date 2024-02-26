import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { SelectItem } from '@angular-auth/libs/common';
import { getErrorMessage } from '@angular-auth/libs/web/shared/utils';

@Component({
  selector: 'aa-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <label class="form-control w-full">
      <select
        data-testing-id="select"
        class="select select-bordered w-full"
        [formControlName]="formControlName"
        [class]="hasError ? 'select-error' : ''"
      >
        <option data-testing-id="default-option" selected disabled value="0">
          {{ placeholder }}
        </option>
        @for (item of list; track item.id) {
          <option data-testing-id="option" [value]="item.id">
            {{ item.name }}
          </option>
        }
      </select>

      @if (hasError && errorMessage) {
        <div class="label">
          <span data-testing-id="select-error-label" class="text-error">{{ errorMessage }}</span>
        </div>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements DoCheck {
  @Input({ required: true }) list: SelectItem[] = [];
  @Input({ required: true }) placeholder!: string;
  @Input({ required: true }) formControlName!: string;
  @Input({ required: true }) formControl!: FormControl;

  errorMessage = '';

  private readonly cdr = inject(ChangeDetectorRef);

  ngDoCheck(): void {
    this.errorMessage = getErrorMessage(this.formControl);
    this.cdr.markForCheck();
  }

  get hasError(): boolean {
    return this.formControl.invalid && (this.formControl.touched || this.formControl.dirty);
  }
}
