import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static passwordMatchingValidator(password: FormControl<string>, confirmPassword: FormControl<string>): ValidatorFn {
    return () =>
      password && confirmPassword && password.value === confirmPassword.value ? null : { notmatched: true };
  }

  static requiredSelectValidator(control: AbstractControl): ValidationErrors | null {
    return !control?.value ? { required: true } : null;
  }
}
