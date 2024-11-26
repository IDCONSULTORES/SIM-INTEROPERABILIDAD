import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ]
})
export class LoginModule { }
