import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { webHomeRoutes } from './web-home.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(webHomeRoutes)],
})
export class WebHomeModule {}
