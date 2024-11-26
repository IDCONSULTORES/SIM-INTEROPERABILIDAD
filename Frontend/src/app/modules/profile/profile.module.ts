import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileIconComponent } from './icons/profile-icon.component';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { SharedModule } from '@modules/shared/shared.module';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileIconComponent,
    ChangePasswordModalComponent,
  ],
  imports: [CommonModule, MaterialModule],
})
export class ProfileModule {}
