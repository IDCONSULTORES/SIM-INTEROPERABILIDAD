import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { ProfileComponent } from './profile.component';
import { AuthenticationService } from '@services/authentication.service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthenticationService', ['verify', 'currentUserValue']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on initialization', fakeAsync(() => {
    const mockUserData = {
      payload: {
        name: 'John',
        lastNames: 'Doe',
        email: 'john@example.com',
        identificationNumber: '123456',
        region: 'Some Region',
        phone: '555-1234',
        photo: { id: 1 },
      },
    };

    authService.verify.and.returnValue(of(mockUserData));
    authService.currentUserValue.and.returnValue({ access_token: 'fake_token' });

    component.ngOnInit();
    tick(); // To simulate the asynchronous behavior

    expect(authService.verify).toHaveBeenCalled();
    expect(authService.currentUserValue).toHaveBeenCalled();
    expect(component.name).toBe('John Doe');
    expect(component.email).toBe('john@example.com');
    expect(component.dni).toBe('123456');
    expect(component.region).toBe('Some Region');
    expect(component.telefono).toBe('555-1234');
    expect(component.photo).toEqual({ id: 1 });
  }));

  it('should open the change password modal', () => {
    component.changePasswordModal();
    expect(dialog.open).toHaveBeenCalledWith(ChangePasswordModalComponent, {
      width: '600px',
      panelClass: ['dialog-no-padding', 'general-modal'],
    });
  });

  // Add more test cases as needed for other methods and behavior
});
