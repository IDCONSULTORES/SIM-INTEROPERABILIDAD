import { ComponentFixture, TestBed, fakeAsync, tick,flush } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageModalComponent } from './message-modal.component';
import { WfsService } from '@services/wfs.service';
import { ToastService } from '@services/toast.service';
import { DemandService } from '@services/demand.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { of } from 'rxjs';

fdescribe('MessageModalComponent', () => {
  let component: MessageModalComponent;
  let fixture: ComponentFixture<MessageModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<MessageModalComponent>>;
  let wfsService: jasmine.SpyObj<WfsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let demandService: jasmine.SpyObj<DemandService>;
  let scheduleService: jasmine.SpyObj<ScheduleService>;
  let comparisonService: jasmine.SpyObj<ComparisonService>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    wfsService = jasmine.createSpyObj('WfsService', ['deleteWFS']);
    toastService = jasmine.createSpyObj('ToastService', ['showInfoToast', 'showErrorToast']);
    demandService = jasmine.createSpyObj('DemandService', ['tab']);
    scheduleService = jasmine.createSpyObj('ScheduleService', ['deleteSchedule']);
    comparisonService = jasmine.createSpyObj('ComparisonService', ['postCompare']);
    authService = jasmine.createSpyObj('AuthenticationService', ['verify', 'currentUserValue']);
    userService = jasmine.createSpyObj('UserService', ['getUser']);

    TestBed.configureTestingModule({
      declarations: [MessageModalComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: WfsService, useValue: wfsService },
        { provide: ToastService, useValue: toastService },
        { provide: DemandService, useValue: demandService },
        { provide: ScheduleService, useValue: scheduleService },
        { provide: ComparisonService, useValue: comparisonService },
        { provide: AuthenticationService, useValue: authService },
        { provide: UserService, useValue: userService },
      ],
    });

    fixture = TestBed.createComponent(MessageModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with button data', () => {
    const data = 'Test Data';
    component.closeModalWithButton(data);
    expect(dialogRef.close).toHaveBeenCalledWith(data);
  });

  it('should compare and show info toast', fakeAsync(() => {
    // Simular un valor para authService.currentUserValue
    const authServiceValue = { access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIzMyIsImlhdCI6MTY5NzU2MTI4MCwiZXhwIjoxNjk3NjA0NDgwfQ.g7uQxTjWhcTjPvYuM9rxljD3PUT1LzruO_zU2e9Not7Ywzhzeeb55hqxhEoRAXKN5prwmO4KWWh9K91Nf0IZyg' }; // Define this properly
    authService.currentUserValue.and.returnValue(authServiceValue);

  
    // El resto de la prueba sigue igual
    authService.verify.and.returnValue(of({ payload: { id: '1' } }));
    userService.getUser.and.returnValue(of({ payload: { user: [{ dataBases: [{ typeServer: 'ODBC Driver 17 for SQL Server' }] }] }}));
  
    component.data.data = {
      url: 'https://winlmprap09.midagri.gob.pe/winlmprap14/services/ConPuchePeru/SENASA_ANIM_MUESTRADOS/MapServer/WFSServer',
      percent: 70,
      createBy:'juanpa@gmail.com',
      typeP: 'register',
      typeDB: 'ODBC Driver 17 for SQL Server',
    }

    var body = {
      url: component.data.data.url,
      percent: component.data.data.percent,
      email:'juanpa@gmail.com',
      typeP:component.data.data.typeP,
      typeDB:component.data.data.typeDB,
    }
    const compareServiceResponse = { /* definir la respuesta simulada aquí */ };
    comparisonService.postCompare.and.returnValue(of(compareServiceResponse));
    component.compare();
    flush();
    expect(authService.verify).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalledWith('1');
    expect(comparisonService.postCompare).toHaveBeenCalledWith(body);
    expect(toastService.showInfoToast).toHaveBeenCalledTimes(1);
  }));
  

  it('should delete service and show info toast', () => {
    const wfsId = 'testId';
    component.data.id = wfsId;
    wfsService.deleteWFS.and.returnValue(of({}));

    component.deleteService();
    expect(wfsService.deleteWFS).toHaveBeenCalledWith(wfsId);
    expect(toastService.showInfoToast).toHaveBeenCalledTimes(1);
  });

  it('should delete schedule and show info toast', () => {
    const scheduleId = 'testId';
    component.data.id = scheduleId;
    scheduleService.deleteSchedule.and.returnValue(of({}));

    component.deleteSchedule();
    expect(scheduleService.deleteSchedule).toHaveBeenCalledWith(scheduleId);
    expect(toastService.showInfoToast).toHaveBeenCalledTimes(1);
  });

  it('should perform actions based on title', () => {
    const mockTitle = 'Eliminar Servicio';
    component.data.title = mockTitle;
    spyOn(component, 'deleteService');
    spyOn(component, 'closeModalWithButton');

    component.actions();

    expect(component.deleteService).toHaveBeenCalledTimes(1);
    expect(component.closeModalWithButton).toHaveBeenCalledWith('Eliminado');
  });




});

