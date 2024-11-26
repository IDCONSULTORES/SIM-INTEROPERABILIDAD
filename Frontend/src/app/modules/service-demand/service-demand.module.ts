import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceDemandComponent } from './service-demand.component';
import { DemantTableComponent } from './components/demant-table/demant-table.component';
import { MaterialModule } from '@modules/material/material.module';
import { SharedModule } from '@modules/shared/shared.module';
import { ActionIconsModule } from '@app/layouts/action-icons/action-icons.module';
import { SecondTableComponent } from './components/second-table/second-table.component';
import { PipeGMT5Pipe } from '@modules/shared/components/pipes/pipe-gmt5.pipe';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { FrequencyPipe } from '@modules/shared/components/pipes/frequency.pipe';
@NgModule({
  declarations: [ServiceDemandComponent, DemantTableComponent, SecondTableComponent,PipeGMT5Pipe, EditScheduleComponent,FrequencyPipe],
  imports: [CommonModule, MaterialModule, SharedModule, ActionIconsModule],
})
export class ServiceDemandModule {}
