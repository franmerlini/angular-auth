import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';
import { FooterComponent } from '@angular-auth/web/shell/ui/footer';
import { HeaderComponent } from '@angular-auth/web/shell/ui/header';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <aa-header (logout)="onLogout()" />

      <div class="flex-grow">
        <router-outlet />
      </div>

      <aa-footer />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private authStore = inject(AuthStore);

  onLogout(): void {
    this.authStore.logout();
  }
}
