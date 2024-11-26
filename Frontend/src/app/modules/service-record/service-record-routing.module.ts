import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceRecordComponent } from './service-record/service-record.component';

const routes: Routes = [{ path: '', component: ServiceRecordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRecordRoutingModule {}
