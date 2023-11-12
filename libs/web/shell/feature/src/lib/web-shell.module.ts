import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { webShellFeatureRoutes } from './web-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(webShellFeatureRoutes)],
  exports: [RouterModule],
})
export class WebShellModule {}
