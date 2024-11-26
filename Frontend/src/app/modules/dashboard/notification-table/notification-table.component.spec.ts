import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogsService } from '@services/logs.service';
import { NotificationTableComponent } from './notification-table.component';

describe('NotificationTableComponent', () => {
  let component: NotificationTableComponent;
  let fixture: ComponentFixture<NotificationTableComponent>;

  beforeEach(() => {
    const matDialogStub = () => ({});
    const logsServiceStub = () => ({
      getLogs: () => ({ subscribe: (f:any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NotificationTableComponent],
      providers: [
        { provide: MatDialog, useFactory: matDialogStub },
        { provide: LogsService, useFactory: logsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NotificationTableComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([
      `descripcion`,
      `fecha`,
      `creado_por`,
      `duracion`,
      `estado`
    ]);
  });

  it(`selectedNot has default value`, () => {
    expect(component.selectedNot).toEqual(0);
  });

  it(`dataestado_val has default value`, () => {
    expect(component.dataestado_val).toEqual([0, 0, 0]);
  });

  it(`dataestado_nom has default value`, () => {
    expect(component.dataestado_nom).toEqual([
      `Exitoso`,
      `Fallido`,
      `Notificaciones`
    ]);
  });
});
