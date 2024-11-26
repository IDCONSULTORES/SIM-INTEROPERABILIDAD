import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '@modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NotificationTableComponent } from './notification-table/notification-table.component';

@NgModule({
  declarations: [DashboardComponent, NotificationTableComponent],
  imports: [CommonModule, MaterialModule,FormsModule, SharedModule],
})
export class DashboardModule {}
