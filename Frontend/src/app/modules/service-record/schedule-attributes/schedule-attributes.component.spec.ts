import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ScheduleAttributesComponent } from './schedule-attributes.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastService } from '@services/toast.service';
import { LayerService } from '@services/layer.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

fdescribe('ScheduleAttributesComponent', () => {
  let component: ScheduleAttributesComponent;
  let fixture: ComponentFixture<ScheduleAttributesComponent>;
  let layerService: LayerService;
  let authService: AuthenticationService;
  let userService: UserService;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ScheduleAttributesComponent>>;

  beforeEach(() => {
    // Dentro del bloque beforeEach
    
    TestBed.configureTestingModule({
      
      declarations: [ScheduleAttributesComponent],
      imports: [MatDialogModule, BrowserAnimationsModule,HttpClientTestingModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        LayerService,
        AuthenticationService,
        UserService
             ],
    });
    fixture = TestBed.createComponent(ScheduleAttributesComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService); // Obtiene una instancia del servicio real
    userService = TestBed.inject(UserService); // Obtiene una instancia del servicio real
    layerService = TestBed.inject(LayerService);
     // Espía el método close de MatDialogRef
     dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

     // Inyecta el diálogo espiado en el componente
     component.dialog = dialogRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call putLayers2 when patch_layers is called', fakeAsync( () => {
    const authServiceVerifySpy = spyOn(authService, 'verify').and.returnValue(of({ payload: { id: 'testUserId', email: 'test@example.com' } }));
    const userServiceGetUserSpy = spyOn(userService, 'getUser').and.returnValue(of({ payload: { user: [{ institution: { name: 'MIDAGRI' } }] }}));
    // Simula el valor seleccionado en el select
    const layerServicePatchSpy = spyOn(layerService, 'putLayers2').and.returnValue(of({ payload: {description:"FEACT"}}));
    const selectElement = document.createElement('select');
    
    selectElement.id = 'sele';
    selectElement.value = 'FEACT';
    document.body.appendChild(selectElement);
    // Llama a la función patch_layers
    layerService.putLayers2({ field: 'FEACT' },'1')
    component.patch_layers();
    flush();
    // Verifica que LayerService.putLayers2 se haya llamado con los valores correctos
    

    // Verifica que se llamó el servicio WfsService con el formulario
    expect(layerServicePatchSpy).toHaveBeenCalledWith({ field: 'FEACT' }, '1');
    expect(dialogRef.close).toHaveBeenCalled();
  }));



});
