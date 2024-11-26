import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@modules/material/material.module';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ModalDeletePermissionsComponent } from './components/modal-delete-permissions/modal-delete-permissions.component';

@NgModule({
  declarations: [MainPageComponent, ModalDeletePermissionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: MainPageComponent }]),
  ],
})
export class UserRegistrationModule {}
