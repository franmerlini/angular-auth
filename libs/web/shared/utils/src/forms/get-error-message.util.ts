import { ValidationErrors } from '@angular/forms';

export const getErrorMessage = (errorKey: string, validationErrors: ValidationErrors): string => {
  const ERROR_MESSAGES: Record<string, string> = {
    required: 'El campo es requerido.',
    email: 'El campo debe ser un correo electrónico.',
    maxlength: `El campo debe tener menos de ${validationErrors['requiredLength']} caracteres.`,
    minlength: `El campo debe tener más de ${validationErrors['requiredLength']} caracteres.`,
    min: `El campo debe ser mayor a ${validationErrors['min']}.`,
    max: `El campo debe ser menor a ${validationErrors['max']}.`,
  };

  return ERROR_MESSAGES[errorKey];
};
