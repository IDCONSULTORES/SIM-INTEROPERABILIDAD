import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiModalComponent } from './components/ui-modal/ui-modal.component';
import { SearchIconOfferComponent } from './components/search-icon.component';
import { MaterialModule } from '@modules/material/material.module';
import { MessageModalComponent } from './components/message-modal/message-modal.component';
import { BasicChartAreaComponent } from './components/basic-chart-area/basic-chart-area.component';
import { BasicDonutComponentComponent } from './components/basic-donut-component/basic-donut-component.component';
import { BasicPieComponentComponent } from './components/basic-pie-component/basic-pie-component.component';
import { SkeletonLoadingComponent } from './components/skeleton-loading/skeleton-loading.component';
import { EyeIconComponent } from './components/icons/eye-icon.component';

@NgModule({
  declarations: [
    UiModalComponent,
    SearchIconOfferComponent,
    MessageModalComponent,
    BasicChartAreaComponent,
    BasicDonutComponentComponent,
    BasicPieComponentComponent,
    SkeletonLoadingComponent,
    EyeIconComponent,
  

    
  ],
  imports: [CommonModule, MaterialModule],
  providers: [],
  exports: [
    SearchIconOfferComponent,
    BasicChartAreaComponent,
    BasicDonutComponentComponent,
    BasicPieComponentComponent,
    SkeletonLoadingComponent,
    EyeIconComponent
  ],
})
export class SharedModule {}
