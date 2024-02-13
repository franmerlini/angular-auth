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
        class="select select-bordered w-full"
        [formControlName]="formControlName"
        [class]="hasError ? 'border-red-500 placeholder-red-500' : ''"
      >
        @for (item of list; track item.id; let i = $index) {
          <option [value]="item.id" [selected]="i === 0" [disabled]="i === 0">
            {{ item.name }}
          </option>
        }
      </select>
      @if (hasError && errorMessage) {
        <div class="label">
          <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
        </div>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements DoCheck {
  @Input({ required: true }) list: SelectItem[] = [];
  @Input({ required: true }) formControlName = '';
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
