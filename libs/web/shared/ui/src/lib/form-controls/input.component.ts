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
        [type]="type"
        [placeholder]="placeholder"
        class="input input-bordered w-full"
        [formControlName]="formControlName"
        [class]="hasError ? 'border-red-500 placeholder-red-500' : ''"
      />

      @if (hasError && errorMessage) {
        <div class="label">
          <span class="label-text-alt text-red-500">{{ errorMessage }}</span>
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
    this.errorMessage = this.getErrorMessage();
    this.cdr.markForCheck();
  }

  get hasError(): boolean {
    return this.formControl.invalid && (this.formControl.touched || this.formControl.dirty);
  }

  private getErrorMessage(): string {
    const errors = this.formControl.errors;

    if (errors) {
      for (const key of Object.keys(errors)) {
        const value = errors[key];

        if (Object.prototype.hasOwnProperty.call(errors, key)) {
          return getErrorMessage(key, value);
        }
      }
    }

    return '';
  }
}
