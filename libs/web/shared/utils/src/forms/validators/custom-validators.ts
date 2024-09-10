import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordMatchingValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const password = formGroup.get(passwordKey) as FormControl<string>;
      const confirmPassword = formGroup.get(confirmPasswordKey) as FormControl<string>;

      return password && confirmPassword && password.value === confirmPassword.value ? null : { notmatched: true };
    };
  }

  static requiredSelectValidator(control: AbstractControl): ValidationErrors | null {
    return !control?.value ? { required: true } : null;
  }
}
