import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'aa-register-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {}
