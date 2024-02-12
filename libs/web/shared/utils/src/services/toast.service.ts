import { Injectable, inject } from '@angular/core';

import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toast = inject(HotToastService);

  info(message: string): void {
    this.toast.info(message, {
      duration: 5000,
    });
  }

  success(message: string): void {
    this.toast.success(message, {
      duration: 5000,
    });
  }

  warning(message: string): void {
    this.toast.warning(message, {
      duration: 5000,
    });
  }

  error(message: string): void {
    this.toast.error(message, {
      autoClose: false,
      dismissible: true,
    });
  }
}
