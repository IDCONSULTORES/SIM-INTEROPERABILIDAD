import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceOfferComponent } from './service-offer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ActionIconsModule } from '@app/layouts/action-icons/action-icons.module';
import { ServiceOfferTableComponent } from './components/service-offer-table/service-offer-table.component';
import { ScheduleTaskComponent } from './components/schedule-task/schedule-task.component';
import { ScheduleAttributesComponent } from './components/schedule-attributes/schedule-attributes.component';
import { SharedModule } from '@modules/shared/shared.module';
import { AvailabilityTableComponent } from './components/availability-table/availability-table.component';
import { LayerLoadDialogComponent } from './components/layer-load-dialog/layer-load-dialog.component';
import { DaysPipe } from '@modules/shared/components/pipes/days.pipe';
@NgModule({
  declarations: [
    ServiceOfferComponent,
    ServiceOfferTableComponent,
    ScheduleTaskComponent,
    ScheduleAttributesComponent,
    AvailabilityTableComponent,
    LayerLoadDialogComponent,
    DaysPipe
  ],
  imports: [
    CommonModule,
    ActionIconsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ServiceOfferComponent }]),
  ],
})
export class ServiceOfferModule {}
