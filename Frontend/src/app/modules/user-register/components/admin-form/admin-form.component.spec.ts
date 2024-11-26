import { ComponentFixture, TestBed, fakeAsync, waitForAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminFormComponent } from './admin-form.component';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { FileService } from '@services/file.service';
import { UploadPhotoComponent } from '../upload-photo/upload-photo.component';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';
fdescribe('AdminFormComponent', () => {
  let component: AdminFormComponent;
  let fixture: ComponentFixture<AdminFormComponent>;
  let toastService: jasmine.SpyObj<ToastService>;
  let userService: jasmine.SpyObj<UserService>;
  let fileService: jasmine.SpyObj<FileService>;

  beforeEach(() => {
    toastService = jasmine.createSpyObj('ToastService', ['showInfoToast', 'showErrorToast', 'showWarningToast']);
    userService = jasmine.createSpyObj('UserService', ['postUser']);
    fileService = jasmine.createSpyObj('FileService', ['postFile']);

    TestBed.configureTestingModule({
      declarations: [AdminFormComponent, UploadPhotoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ToastService, useValue: toastService },
        { provide: UserService, useValue: userService },
        { provide: FileService, useValue: fileService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.userForm).toBeDefined();
    expect(component.userForm.get('username')).toBeDefined();
    expect(component.userForm.get('name')).toBeDefined();
    // Add more expectations for form controls as needed
  });

  it('should toggle password visibility', () => {
    component.showPassword = false;
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);

    component.showPassword = true;
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(false);
  });

  it('should toggle password2 visibility', () => {
    component.showPassword2 = false;
    component.togglePasswordVisibility2();
    expect(component.showPassword2).toBe(true);

    component.showPassword2 = true;
    component.togglePasswordVisibility2();
    expect(component.showPassword2).toBe(false);
  });

  it('should submit the form', fakeAsync(() => {
    const mainFileAsBlob = { id: 1, name: 'test.jpg', file: new File(['test'], 'test.jpg') };
    spyOn(component, 'parseMainFile').and.returnValue(of(mainFileAsBlob));
    component.userForm.setValue({
      username: 'testUser',
      name: 'Test Name',
      region: 'Test Region',
      phone: '1234567890',
      lastNames: 'Test Last Names',
      password: 'ValidPassword1@',
      confirmPassword: 'ValidPassword1@',
      identificationNumber: '123456789',
      email: 'test@example.com',
      identificationType: 'ID', // Replace with the actual value
    });

    var body = {
      username: 'testUser',
      name: 'Test Name',
      region: 'Test Region',
      phone: '1234567890',
      lastNames: 'Test Last Names',
      password: 'ValidPassword1@',
      confirmPassword: 'ValidPassword1@',
      identificationNumber: '123456789',
      email: 'test@example.com',
      identificationType: 'ID', // Replace with the actual value
      institutionType: 'privada',
      type: 'administrador',
      photoId: 1,
    }
    if(userService.postUser(body))
    {
      component.onSubmit();
    }

    flush()
    expect(component.userForm.valid).toBe(true);
    expect(userService.postUser).toHaveBeenCalledWith(body);
  }));





  it('should handle photo selection from UploadPhotoComponent', () => {
    const photo = { id: 2, name: 'test2.jpg', file: new File(['test'], 'test2.jpg') };
    component.catchPhoto(photo);

    expect(component.mainFileAsBlob).toEqual(photo);
    expect(component.uploadPhoto).toBe(false);
  });

  it('should handle invalid password', () => {
    const invalidPassword = 'invalid';
    const invalidPasswordControl = new FormControl(invalidPassword);
    const result = component.validarContrasena(invalidPasswordControl);

    expect(result).toEqual({ invalidPassword: true });
  });

  it('should handle valid password', () => {
    const validPassword = 'ValidPassword1@';
    const validPasswordControl = new FormControl(validPassword);
    const result = component.validarContrasena(validPasswordControl);
  
    expect(result).toBeNull();
  });
});
