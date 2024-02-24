import { FormControl } from '@angular/forms';

import { getErrorMessage } from './get-error-message.util';

describe(`getErrorMessage Fn`, () => {
  it(`should return '' if the formControl has no errors`, () => {
    // Arrange
    const formControl = new FormControl('');
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('');
  });

  it(`should return 'El campo es requerido.' if the error is 'required'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ required: true });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo es requerido.');
  });

  it(`should return 'El campo debe ser un correo electrónico.' if the error is 'email'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ email: true });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo debe ser un correo electrónico.');
  });

  it(`should return 'El campo debe tener menos de 5 caracteres.' if the error is 'maxlength'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ maxlength: { requiredLength: 5, actualLength: 6 } });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo debe tener menos de 5 caracteres.');
  });

  it(`should return 'El campo debe tener más de 5 caracteres.' if the error is 'minlength'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ minlength: { requiredLength: 5, actualLength: 4 } });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo debe tener más de 5 caracteres.');
  });

  it(`should return 'El campo debe ser mayor a 5.' if the error is 'min'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ min: { min: 5, actual: 4 } });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo debe ser mayor a 5.');
  });

  it(`should return 'El campo debe ser menor a 5.' if the error is 'max'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ max: { max: 5, actual: 6 } });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('El campo debe ser menor a 5.');
  });

  it(`should return 'Las contraseñas no coinciden.' if the error is 'notmatched'`, () => {
    // Arrange
    const formControl = new FormControl('');
    formControl.setErrors({ notmatched: true });
    // Act
    const result = getErrorMessage(formControl);
    // Assert
    expect(result).toEqual('Las contraseñas no coinciden.');
  });
});
