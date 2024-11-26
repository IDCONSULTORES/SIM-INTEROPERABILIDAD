import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteIconComponent } from './icons/delete-icon.component';
import { CheckIconComponent } from '../action-icons/icons/check-icon.component';
import { EditIconComponent } from './icons/edit-icon.component';
import { CancelIconComponent } from './icons/cancel-icon.component';
import { TimeIconComponent } from './icons/time-icon.component';
import { DemandIconComponent } from './icons/demand-icon.component';
import { WorldIconComponent } from './icons/world-icon.component';
import { ReloadIconComponent } from './icons/reload-icon.component';
import { EditIconDisabledComponent } from './icons/edit-icon-disabled.component';
import { DemandIconComponentDisabled } from './icons/demand-icon-disabled.component';
import { TimeIconComponentDisabled } from './icons/time-icon.component copy';

@NgModule({
  declarations: [
    DeleteIconComponent,
    CheckIconComponent,
    EditIconComponent,
    CancelIconComponent,
    TimeIconComponent,
    DemandIconComponent,
    WorldIconComponent,
    ReloadIconComponent,
    EditIconDisabledComponent,
    DemandIconComponentDisabled,
    TimeIconComponentDisabled
  ],
  imports: [CommonModule],
  exports: [
    DeleteIconComponent,
    CheckIconComponent,
    EditIconComponent,
    CancelIconComponent,
    TimeIconComponent,
    DemandIconComponent,
    WorldIconComponent,
    ReloadIconComponent,
    EditIconDisabledComponent,
    DemandIconComponentDisabled,
    TimeIconComponentDisabled
  ],
})
export class ActionIconsModule {}
