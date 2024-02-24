import { FormControl } from '@angular/forms';

import { CustomValidators } from './custom-validators';

describe('CustomValidators Class', () => {
  describe('passwordMatchingValidator method', () => {
    it('should return null if password and confirmPassword are equal', () => {
      // Arrange
      const password = new FormControl('password') as FormControl<string>;
      const confirmPassword = new FormControl('password') as FormControl<string>;
      // Act
      const validatorFn = CustomValidators.passwordMatchingValidator(password, confirmPassword);
      const result = validatorFn(confirmPassword);
      // Assert
      expect(result).toBeNull();
    });

    it('should return { notmatched: true } if password and confirmPassword are not equal', () => {
      // Arrange
      const password = new FormControl('password') as FormControl<string>;
      const confirmPassword = new FormControl('password1') as FormControl<string>;
      // Act
      const validatorFn = CustomValidators.passwordMatchingValidator(password, confirmPassword);
      const result = validatorFn(confirmPassword);
      // Assert
      expect(result).toEqual({ notmatched: true });
    });
  });

  describe('requiredSelectValidator method', () => {
    it('should return null if control has a value', () => {
      // Arrange
      const control = new FormControl(1);
      // Act
      const result = CustomValidators.requiredSelectValidator(control);
      // Assert
      expect(result).toBeNull();
    });

    it('should return { required: true } if control does not have a value', () => {
      // Arrange
      const control = new FormControl('');
      // Act
      const result = CustomValidators.requiredSelectValidator(control);
      // Assert
      expect(result).toEqual({ required: true });
    });

    it('should return { required: true } if control has a value of 0', () => {
      // Arrange
      const control = new FormControl(0);
      // Act
      const result = CustomValidators.requiredSelectValidator(control);
      // Assert
      expect(result).toEqual({ required: true });
    });
  });
});
