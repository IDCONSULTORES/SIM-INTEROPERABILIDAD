import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-schedule-attributes',
  templateUrl: './schedule-attributes.component.html',
  styleUrls: ['./schedule-attributes.component.scss'],
})
export class ScheduleAttributesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['campo', 'accion', 'clave_primaria'];
  private dataTest = {
    projectNameTreatment: 'test',
    documentType: 'test',
    documentTypeName: 'test',
    issuanceDate: '12/12/23',
  };

  public dataSource: any = new MatTableDataSource([]);
  constructor(private dialog: MatDialog) {
    const data = [];
    for (let index = 0; index < 30; index++) {
      data.push({ ...this.dataTest });
    }
    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit(): void {}
}
