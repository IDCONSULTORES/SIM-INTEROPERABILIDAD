import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MdbAccordionModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule,
    MatTableModule,
    CdkAccordionModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatSelectModule,
    MatSidenavModule,
    MatAutocompleteModule,
    NgbModule,
    NgApexchartsModule,
    MatSnackBarModule,
    MatTreeModule,
    MatTooltipModule,
  ],

  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class MaterialModule {}
