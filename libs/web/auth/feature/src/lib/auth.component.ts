import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'aa-auth',
  standalone: true,
  imports: [CommonModule],
  template: `<p>auth works!</p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
