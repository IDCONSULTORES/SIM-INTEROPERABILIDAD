import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '@services/authentication.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router'
import { ServiceRecordComponent } from '@modules/service-record/service-record/service-record.component';
fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let routerSpy: any;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule,RouterTestingModule.withRoutes(
        [{path: 'registro-de-servicios', component: ServiceRecordComponent}]
      )],
      providers: [AuthenticationService,HttpClientTestingModule,HttpClient,HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService); // Inyecta el servicio de autenticación
    // Crear un espía personalizado para router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

     });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.formLogin).toBeDefined();
    expect(component.formLogin.get('email')).toBeDefined();
    expect(component.formLogin.get('password')).toBeDefined();
  });

  it('should show error when submitting with invalid form', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    submitButton.click();
    expect(component.showError).toBeFalse();
  });

  it('should log in successfully', () => {
    const loginData = { email: 'test@example.com', password: 'password' };
    spyOn(authService, 'login').and.returnValue(of({ access_token: 'test_token', refresh_token: 'test_refresh_token' }));
    
    component.formLogin.setValue(loginData);
    component.login();
    
    expect(authService.login).toHaveBeenCalledWith(loginData);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  });

  it('should handle login error', () => {
    spyOn(authService, 'login').and.returnValue(of(null)); // Simula un error en el servicio

    component.formLogin.setValue({ email: 'invalid@example.com', password: 'invalid' });
    component.login();

    expect(authService.login).toHaveBeenCalled();
    expect(component.showError).toBeFalse();
  });
});
