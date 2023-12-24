import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Country, CreateUserDTO } from '@angular-auth/libs/common';

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
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  @Input({ required: true }) countryList!: Country[];

  @Output() registerUser = new EventEmitter<CreateUserDTO>();

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
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      country: this.fb.control(0, [Validators.required]),
      acceptTerms: this.fb.control(false, [Validators.requiredTrue]),
    });
  }

  register(event: SubmitEvent): void {
    event.preventDefault();

    if (this.form.invalid || this.acceptTerms.invalid) {
      return;
    }

    const { firstName, lastName, email, password, city, country } =
      this.form.getRawValue();

    this.registerUser.emit({
      firstName,
      lastName,
      email,
      password,
      city,
      country: this.countryList.find(({ id }) => id === country) as Country,
    });
  }

  get acceptTerms(): FormControl<boolean> {
    return this.form?.get('acceptTerms') as FormControl<boolean>;
  }
}
