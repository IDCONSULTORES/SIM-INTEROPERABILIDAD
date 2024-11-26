import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user-register.component';
import { InstituteFormComponent } from './components/institute-form/institute-form.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminIconComponent } from './icons/admin-icon.component';
import { InstituteIconComponent } from './icons/institute-icon.component';
import { RouterModule } from '@angular/router';
import { EyeIconComponent } from '../shared/components/icons/eye-icon.component';
import { UploadPhotoComponent } from './components/upload-photo/upload-photo.component';
import { UploadIconComponent } from './icons/upload-icon.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '@modules/shared/shared.module';
@NgModule({
  declarations: [
    UserRegisterComponent,
    InstituteFormComponent,
    AdminFormComponent,
    AdminIconComponent,
    InstituteIconComponent,    
    UploadPhotoComponent,
    UploadIconComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserRegisterComponent },
      { path: 'instituto', component: InstituteFormComponent },
      { path: 'admin', component: AdminFormComponent },
    ]),
  ],
})
export class UserRegisterModule {}
