import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [ResetPasswordPageComponent],
  imports: [CommonModule, ResetPasswordRoutingModule, MaterialModule],
})
export class ResetPasswordModule {}
