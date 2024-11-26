import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateServiceComponent } from './create-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WfsService } from '@services/wfs.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { flush } from '@angular/core/testing';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
describe('CreateServiceComponent', () => {
  let component: CreateServiceComponent;
  let fixture: ComponentFixture<CreateServiceComponent>;

  let wfsService: WfsService;
  let authService: AuthenticationService;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateServiceComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { isEditMode: false, wfs: null } },
        { provide: MatDialogRef, useValue: {} },
        WfsService, // Agrega el servicio real
        AuthenticationService, // Agrega el servicio real
        UserService // Agrega el servicio real
      ],
    });

    fixture = TestBed.createComponent(CreateServiceComponent);
    component = fixture.componentInstance;
    wfsService = TestBed.inject(WfsService); // Obtiene una instancia del servicio real
    authService = TestBed.inject(AuthenticationService); // Obtiene una instancia del servicio real
    userService = TestBed.inject(UserService); // Obtiene una instancia del servicio real

    fixture.detectChanges();
  });

  it('should fill out the form and submit', fakeAsync(() => {
    // Simula el comportamiento del servicio AuthenticationService y UserService
    const authServiceVerifySpy = spyOn(authService, 'verify').and.returnValue(of({ payload: { id: 'testUserId', email: 'test@example.com' } }));
    const userServiceGetUserSpy = spyOn(userService, 'getUser').and.returnValue(of({ payload: { user: [{ institution: { name: 'MIDAGRI' } }] }}));

    // Simula el servicio WfsService
    const wfsServicePostWFSSpy = spyOn(wfsService, 'postWFS').and.returnValue(of({ /* datos de respuesta del servicio WfsService */ }));

    const formValue = {
      url: 'https://example.com/sample-service',
      availabilities: [],
      periodicity: 'Diaria',
      email: 'test@example.com',
      name: 'Sample WFS Service',
      service: 'Sample Service',
      institution: 'MIDAGRI',
    };

    // Llena los campos del formulario
    component.serviceForm.setValue(formValue);
    component.onSubmit();
    flush(); // Espera a que se resuelva la promesa del servicio

    // Verifica que el formulario esté válido
    expect(component.serviceForm.valid).toBe(true);

    // Verifica que se llamaron los servicios AuthenticationService y UserService
    expect(authServiceVerifySpy).toHaveBeenCalledOnceWith({ token: authService.currentUserValue.access_token });
    expect(userServiceGetUserSpy).toHaveBeenCalledOnceWith('testUserId');

    // Verifica que se llamó el servicio WfsService con el formulario
    expect(wfsServicePostWFSSpy).toHaveBeenCalledOnceWith(formValue);

    // Agrega expectativas adicionales según tus necesidades, como verificar el comportamiento del componente
  }));
});
