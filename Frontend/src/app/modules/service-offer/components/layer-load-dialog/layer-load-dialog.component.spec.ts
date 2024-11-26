import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { LayerLoadDialogComponent, ServiceData } from './layer-load-dialog.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WfsService } from '@services/wfs.service';
import { ToastService } from '@services/toast.service';
import { AuthenticationService } from '@services/authentication.service';
import { ComparisonService } from '@services/comparison.service';
import { UserService } from '@services/user.service';
import { MatDialogModule } from '@angular/material/dialog';

fdescribe('LayerLoadDialogComponent', () => {
  let component: LayerLoadDialogComponent;
  let fixture: ComponentFixture<LayerLoadDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<LayerLoadDialogComponent>>;
  let wfsService: jasmine.SpyObj<WfsService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let comparisonService: jasmine.SpyObj<ComparisonService>;
  let userService: jasmine.SpyObj<UserService>;

  const serviceData: ServiceData = {
    isEditMode: false,
    wfs: { id: 1 /* Add appropriate wfs data here */ }
  };

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    wfsService = jasmine.createSpyObj('WfsService', ['insertWFS']);
    toastService = jasmine.createSpyObj('ToastService', ['showInfoToast', 'showErrorToast']);
    authService = jasmine.createSpyObj('AuthenticationService', ['verify', 'currentUserValue']);
    comparisonService = jasmine.createSpyObj('ComparisonService', ['postCompare']);
    userService = jasmine.createSpyObj('UserService', ['getUser']);
    
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LayerLoadDialogComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: serviceData },
        { provide: WfsService, useValue: wfsService },
        { provide: ToastService, useValue: toastService },
        { provide: AuthenticationService, useValue: authService },
        { provide: ComparisonService, useValue: comparisonService },
        { provide: UserService, useValue: userService },
        { provide: Router, useClass: RouterStub } // You can define RouterStub for testing navigation
      ]
    });

    fixture = TestBed.createComponent(LayerLoadDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call load when load method is called', () => {
    const authServiceValue = { access_token: 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiIzMyIsImlhdCI6MTY5NzU2MTI4MCwiZXhwIjoxNjk3NjA0NDgwfQ.g7uQxTjWhcTjPvYuM9rxljD3PUT1LzruO_zU2e9Not7Ywzhzeeb55hqxhEoRAXKN5prwmO4KWWh9K91Nf0IZyg' }; // Define this properly
    authService.currentUserValue.and.returnValue(authServiceValue);

    const userServiceValue = {
      payload: {
        id: 'user_id',
        user: [
          {
            dataBases: [
              {
                typeServer: 'db_type' // Define this properly
              }
            ]
          }
        ]
      }
    };
    userService.getUser.and.returnValue(of(userServiceValue));

    const wfsServiceValue = {
      "idWfs": 11,
      "typeDb": "ODBC Driver 17 for SQL Server"
    }; // Define this properly
    wfsService.insertWFS.and.returnValue(of(wfsServiceValue));
    authService.verify.and.returnValue(of({ payload: { id: 'mockUserId' } })); // Establece un valor de retorno válido para la prueba
    component.load();

    expect(userService.getUser).toHaveBeenCalledWith('mockUserId');
    expect(wfsService.insertWFS).toHaveBeenCalledWith({ idWfs: 1, typeDb: 'db_type' }); // Adjust parameters
    expect(toastService.showInfoToast).toHaveBeenCalledWith('Se cargó la capa exitosamente');

  });
});

class RouterStub {
  navigate(commands: any[], extras?: any): void {}
}
