import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CreateUserDto } from '@angular-auth/libs/api/shared';
import { Country } from '@angular-auth/libs/shared';
import { CheckboxComponent, InputComponent, SelectComponent } from '@angular-auth/libs/web/shared/ui';
import { CustomValidators } from '@angular-auth/libs/web/shared/utils';

const FormKeys = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  password: 'password',
  confirmPassword: 'confirmPassword',
  city: 'city',
  country: 'country',
  acceptTerms: 'acceptTerms',
} as const;

type RegisterForm = {
  [FormKeys.firstName]: FormControl<string>;
  [FormKeys.lastName]: FormControl<string>;
  [FormKeys.email]: FormControl<string>;
  [FormKeys.password]: FormControl<string>;
  [FormKeys.confirmPassword]: FormControl<string>;
  [FormKeys.city]: FormControl<string>;
  [FormKeys.country]: FormControl<number>;
  [FormKeys.acceptTerms]: FormControl<boolean>;
};

@Component({
  selector: 'aa-register-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputComponent, SelectComponent, CheckboxComponent],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  @Input({ required: true }) countryList!: Country[];

  @Output() register = new EventEmitter<CreateUserDto>();
  @Output() googleRegister = new EventEmitter<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  form!: FormGroup<RegisterForm>;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group<RegisterForm>(
      {
        [FormKeys.firstName]: this.fb.control('', [Validators.required]),
        [FormKeys.lastName]: this.fb.control('', [Validators.required]),
        [FormKeys.email]: this.fb.control('', [Validators.email, Validators.required]),
        [FormKeys.password]: this.fb.control('', [Validators.required, Validators.minLength(8)]),
        [FormKeys.confirmPassword]: this.fb.control('', [Validators.required, Validators.minLength(8)]),
        [FormKeys.city]: this.fb.control('', [Validators.required]),
        [FormKeys.country]: this.fb.control(0, [CustomValidators.requiredSelectValidator]),
        [FormKeys.acceptTerms]: this.fb.control(false, [Validators.requiredTrue]),
      },
      {
        validators: [CustomValidators.passwordMatchingValidator(FormKeys.password, FormKeys.confirmPassword)],
      },
    );
  }

  onSubmit(): void {
    if (this.form.invalid || this.acceptTerms.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { firstName, lastName, email, password, city, country } = this.form.getRawValue();

    this.register.emit({
      firstName,
      lastName,
      email,
      password,
      city,
      country: this.countryList.find(({ id }) => id === +country) as Country,
    });
  }

  get firstName(): FormControl<string> {
    return this.form?.get(FormKeys.firstName) as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.form?.get(FormKeys.lastName) as FormControl<string>;
  }

  get email(): FormControl<string> {
    return this.form?.get(FormKeys.email) as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.form?.get(FormKeys.password) as FormControl<string>;
  }

  get confirmPassword(): FormControl<string> {
    return this.form?.get(FormKeys.confirmPassword) as FormControl<string>;
  }

  get city(): FormControl<string> {
    return this.form?.get(FormKeys.city) as FormControl<string>;
  }

  get country(): FormControl<number> {
    return this.form?.get(FormKeys.country) as FormControl<number>;
  }

  get acceptTerms(): FormControl<boolean> {
    return this.form?.get(FormKeys.acceptTerms) as FormControl<boolean>;
  }
}
