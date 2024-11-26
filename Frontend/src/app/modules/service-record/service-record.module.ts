import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRecordRoutingModule } from './service-record-routing.module';
import { ServiceRecordComponent } from './service-record/service-record.component';
import { SearchIconComponent } from './search-icon.component';
import { ActionIconsModule } from '@app/layouts/action-icons/action-icons.module';
import { MaterialModule } from '@modules/material/material.module';
import { CreateServiceComponent } from './create-service/create-service.component';
import { AvailabilityDialogComponent } from './availability-dialog/availability-dialog.component';
import { ScheduleAttributesComponent } from './schedule-attributes/schedule-attributes.component';
import { SharedModule } from '@modules/shared/shared.module';
import { LayerLoadDialogComponent } from './layer-load-dialog/layer-load-dialog.component';
import { FormsModule } from '@angular/forms';
import { InstitutionDialogComponent } from './institution-dialog/institution-dialog.component';

@NgModule({
  declarations: [
    ServiceRecordComponent,
    SearchIconComponent,
    CreateServiceComponent,
    AvailabilityDialogComponent,
    ScheduleAttributesComponent,
    LayerLoadDialogComponent,
    InstitutionDialogComponent
  ],
  imports: [
    CommonModule,
    ServiceRecordRoutingModule,
    ActionIconsModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ],
})
export class ServiceRecordModule {}
