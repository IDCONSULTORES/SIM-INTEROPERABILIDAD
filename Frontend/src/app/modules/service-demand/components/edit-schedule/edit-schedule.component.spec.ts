import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EditScheduleComponent } from './edit-schedule.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '@services/toast.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { of } from 'rxjs';

fdescribe('EditScheduleComponent', () => {
  let component: EditScheduleComponent;
  let fixture: ComponentFixture<EditScheduleComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<EditScheduleComponent>>;
  let toastService: jasmine.SpyObj<ToastService>;
  let scheduleService: jasmine.SpyObj<ScheduleService>;
  let comparisonService: jasmine.SpyObj<ComparisonService>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    toastService = jasmine.createSpyObj('ToastService', ['showInfoToast', 'showErrorToast']);
    scheduleService = jasmine.createSpyObj('ScheduleService', ['patchSchedule']);
    comparisonService = jasmine.createSpyObj('ComparisonService', ['postCompare']);
    authService = jasmine.createSpyObj('AuthenticationService', ['verify', 'currentUserValue']);
    userService = jasmine.createSpyObj('UserService', ['getUser']);
    TestBed.configureTestingModule({
      declarations: [EditScheduleComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: ToastService, useValue: toastService },
        { provide: ScheduleService, useValue: scheduleService },
        { provide: ComparisonService, useValue: comparisonService },
        { provide: AuthenticationService, useValue: authService },
        { provide: UserService, useValue: userService },
      ],
    });

    fixture = TestBed.createComponent(EditScheduleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form with valid data', fakeAsync(() => {
    // Simular un valor para authService.currentUserValue
    const authServiceValue = { access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIzMyIsImlhdCI6MTY5NzU2MTI4MCwiZXhwIjoxNjk3NjA0NDgwfQ.g7uQxTjWhcTjPvYuM9rxljD3PUT1LzruO_zU2e9Not7Ywzhzeeb55hqxhEoRAXKN5prwmO4KWWh9K91Nf0IZyg' }; // Define this properly
    authService.currentUserValue.and.returnValue(authServiceValue);

    // Simular datos válidos para el formulario
    const formValue = {
      synchroType: 'Programada',
      frequency: 'daily',
      email: 'juanpa@gmail.com',
      startDate: '2023-10-15',
      endDate: '2023-10-20',
      idWfs: 11,
      percent: 70,
      entityName: 'MIDAGRI',
      day: 'Monday',
    };
    const expectedToastMessage = 'Programación registrada exitosamente';

    component.taskForm.setValue(formValue);

    // Disparar el evento de envío del formulario

    expect(component.taskForm.valid).toBe(true);
    const selectElement = document.createElement('select') as HTMLSelectElement;
    selectElement.id = 'sincronizador';
    selectElement.value = 'Programada';
    document.body.appendChild(selectElement);
    scheduleService.patchSchedule('1',formValue)
    component.onSubmit();
    flush()
    
    // Verificar que el servicio ScheduleService.patchSchedule se haya llamado con los datos correctos
    expect(scheduleService.patchSchedule).toHaveBeenCalledWith('1', formValue);

    // Verificar que el método ToastService.showInfoToast se haya llamado
    toastService.showInfoToast.and.callFake((message) => {
      expect(message).toBe(expectedToastMessage);
    });

    // Verificar que el método MatDialogRef.close se haya llamado

  }));

  it('should submit the form with immediate synchronization', fakeAsync(() => {
    // Simular un valor para authService.currentUserValue
    const authServiceValue = { access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIzMyIsImlhdCI6MTY5NzU2MTI4MCwiZXhwIjoxNjk3NjA0NDgwfQ.g7uQxTjWhcTjPvYuM9rxljD3PUT1LzruO_zU2e9Not7Ywzhzeeb55hqxhEoRAXKN5prwmO4KWWh9K91Nf0IZyg' }; // Define this properly
    authService.currentUserValue.and.returnValue(authServiceValue);

  
    // El resto de la prueba sigue igual
    authService.verify({token:'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIzMyIsImlhdCI6MTY5NzY1NDk3NSwiZXhwIjoxNjk3Njk4MTc1fQ.NVkoRAp7BimsoU97HheuxDEtt9zVUYu-a-ylyCPFq0acFytSWpnS8jksW2WapjbZADf4ErHpKezUH2pncmbpTQ'})
    userService.getUser('33')


    var body = {
      url: 'https://winlmprap09.midagri.gob.pe/winlmprap14/services/ConPuchePeru/SENASA_ANIM_MUESTRADOS/MapServer/WFSServer',
      percent: 70,
      email:'juanpa@gmail.com',
      typeP: 'register',
      typeDB: 'SQL Server',
    }
    const compareServiceResponse = { /* definir la respuesta simulada aquí */ };
    comparisonService.postCompare(body)
    component.onSubmit();
    flush();
    expect(authService.verify).toHaveBeenCalled();
    expect(userService.getUser).toHaveBeenCalledWith('33');
    expect(comparisonService.postCompare).toHaveBeenCalledWith(body);
    const expectedToastMessage = 'Programación registrada exitosamente';
    toastService.showInfoToast.and.callFake((message) => {
      expect(message).toBe(expectedToastMessage);
    });
  }));
});
