import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceAvailabilityRoutingModule } from './service-availability-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from '@modules/material/material.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MaterialModule, ServiceAvailabilityRoutingModule],
})
export class ServiceAvailabilityModule {}
