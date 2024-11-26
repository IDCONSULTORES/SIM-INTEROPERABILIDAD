import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOfferIconComponent } from './icons/offer-icon.component';
import { ConfigIconComponent } from './icons/configuration-icon.component';
import { DashboardIconComponent } from './icons/dashboard-icon.component';
import { ServiceIconComponent } from './icons/service-icon.component';
import { CreateUserIconComponent } from './icons/create-user-icon.component';
import { SignOutIconComponent } from './icons/sign-out-icon.component';
import { UserIconComponent } from './icons/user-icon.component';
import { ListUserIconComponent } from './icons/list-user-icon.component';

@NgModule({
  declarations: [
    ConfigIconComponent,
    CreateUserIconComponent,
    CreateOfferIconComponent,
    DashboardIconComponent,
    ServiceIconComponent,
    SignOutIconComponent,
    UserIconComponent,
    ListUserIconComponent
  ],
  imports: [CommonModule],
  exports: [
    ConfigIconComponent,
    CreateUserIconComponent,
    CreateOfferIconComponent,
    DashboardIconComponent,
    ServiceIconComponent,
    SignOutIconComponent,
    UserIconComponent,
    ListUserIconComponent
  ],
})
export class SidebarIconsModule {}
