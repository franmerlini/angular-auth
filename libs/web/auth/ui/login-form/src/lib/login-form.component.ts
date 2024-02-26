import { InputComponent } from '@angular-auth/libs/web/shared/ui';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'aa-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputComponent],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() googleLogin = new EventEmitter<void>();
  @Output() githubLogin = new EventEmitter<void>();
  @Output() login = new EventEmitter<{
    email: string;
    password: string;
  }>();

  private readonly fb = inject(NonNullableFormBuilder);

  form!: FormGroup<LoginForm>;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group<LoginForm>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.login.emit(this.form.getRawValue());
  }

  get email(): FormControl<string> {
    return this.form?.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.form?.get('password') as FormControl<string>;
  }
}
