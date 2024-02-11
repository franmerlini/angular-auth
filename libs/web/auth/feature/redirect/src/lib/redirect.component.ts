import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthStore } from '@angular-auth/libs/web/auth/data-access/store';

@Component({
  selector: 'aa-redirect',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedirectComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authStore = inject(AuthStore);

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const userId = params['userId'];
      const accessToken = params['accessToken'];
      const refreshToken = params['refreshToken'];

      this.authStore.loginWithOAuth({ userId, accessToken, refreshToken });
    });
  }
}
