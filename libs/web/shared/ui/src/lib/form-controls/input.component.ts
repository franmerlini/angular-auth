import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { getErrorMessage } from '@angular-auth/libs/web/shared/utils';

@Component({
  selector: 'aa-input',
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
      <input
        data-testing-id="input"
        [type]="type"
        [placeholder]="placeholder"
        class="input input-bordered w-full"
        [formControlName]="formControlName"
        [class]="hasError ? 'input-error' : ''"
      />

      @if (hasError && errorMessage) {
        <div class="label">
          <span data-testing-id="input-error-label" class="text-error">{{ errorMessage }}</span>
        </div>
      }
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements DoCheck {
  @Input({ required: true }) type = 'text';
  @Input() placeholder = '';
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
