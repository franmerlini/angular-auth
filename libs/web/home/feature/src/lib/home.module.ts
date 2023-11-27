import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { homeRoutes } from './home.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
