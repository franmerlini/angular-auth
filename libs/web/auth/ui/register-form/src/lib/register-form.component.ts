import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Country, CreateUserDTO } from '@angular-auth/libs/common';
import { CheckboxComponent, InputComponent, SelectComponent } from '@angular-auth/libs/web/shared/ui';
import { CustomValidators } from '@angular-auth/libs/web/shared/utils';

type RegisterForm = {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  city: FormControl<string>;
  country: FormControl<number>;
  acceptTerms: FormControl<boolean>;
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

  @Output() register = new EventEmitter<CreateUserDTO>();
  @Output() googleRegister = new EventEmitter<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  form!: FormGroup<RegisterForm>;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group<RegisterForm>({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.email, Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.fb.control('', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.passwordMatchingValidator(this.password, this.confirmPassword),
      ]),
      city: this.fb.control('', [Validators.required]),
      country: this.fb.control(0, [CustomValidators.requiredSelectValidator]),
      acceptTerms: this.fb.control(false, [Validators.requiredTrue]),
    });
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
    return this.form?.get('firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.form?.get('lastName') as FormControl<string>;
  }

  get email(): FormControl<string> {
    return this.form?.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.form?.get('password') as FormControl<string>;
  }

  get confirmPassword(): FormControl<string> {
    return this.form?.get('confirmPassword') as FormControl<string>;
  }

  get city(): FormControl<string> {
    return this.form?.get('city') as FormControl<string>;
  }

  get country(): FormControl<number> {
    return this.form?.get('country') as FormControl<number>;
  }

  get acceptTerms(): FormControl<boolean> {
    return this.form?.get('acceptTerms') as FormControl<boolean>;
  }
}
