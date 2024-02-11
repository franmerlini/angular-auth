import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
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

type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
};

@Component({
  selector: 'aa-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  @Output() googleLogin = new EventEmitter<void>();
  @Output() githubLogin = new EventEmitter<void>();
  @Output() submitForm = new EventEmitter<{
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
      password: this.fb.control('', [Validators.required]),
    });
  }

  handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.form.invalid) {
      return;
    }

    this.submitForm.emit(this.form.getRawValue());
  }
}
