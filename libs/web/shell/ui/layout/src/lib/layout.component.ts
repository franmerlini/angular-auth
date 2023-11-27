import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '@angular-auth/web/shell/ui/footer';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <div class="flex-grow">
        <router-outlet />
      </div>

      <aa-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
