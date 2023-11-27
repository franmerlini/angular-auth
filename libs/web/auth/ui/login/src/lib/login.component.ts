import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aa-login',
  standalone: true,
  imports: [CommonModule],
  template: `<p>login works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
