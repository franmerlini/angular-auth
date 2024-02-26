import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, ReactiveFormsModule } from '@angular/forms';

import { getErrorMessage } from '@angular-auth/libs/web/shared/utils';

@Component({
  selector: 'aa-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  template: `
    <div class="form-control">
      <label class="label cursor-pointer">
        <span data-testing-id="checkbox-label" class="label-text">
          <ng-content></ng-content>
        </span>

        <input
          data-testing-id="checkbox-input"
          type="checkbox"
          class="checkbox"
          [formControlName]="formControlName"
          [class]="hasError ? 'checkbox-error' : ''"
        />
      </label>

      @if (hasError && errorMessage) {
        <div class="label">
          <span data-testing-id="checkbox-error-label" class="text-error">{{ errorMessage }}</span>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements DoCheck {
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
