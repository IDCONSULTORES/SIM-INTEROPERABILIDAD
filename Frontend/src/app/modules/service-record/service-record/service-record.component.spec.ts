import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ServiceRecordComponent } from './service-record.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { MessageModalComponent } from '@modules/shared/components/message-modal/message-modal.component';
import { WfsService } from '@services/wfs.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';  // Importa FormBuilder y ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

fdescribe('ServiceRecordComponent', () => {
  let component: ServiceRecordComponent;
  let fixture: ComponentFixture<ServiceRecordComponent>;
  let wfsService: WfsService;
  let authService: AuthenticationService;
  let userService: UserService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ServiceRecordComponent],
      imports: [MatTableModule,HttpClientModule, MatSortModule, MatPaginatorModule, MatDialogModule, BrowserAnimationsModule,ReactiveFormsModule],
      providers: [
        {
          provide: WfsService,
          useValue: {
            getWFSbyInstitution: () =>
              of({
                payload: {
                  wfs: [
                    {
                      id: 1,
                      name: 'Service 1',
                      pseudoName: 'Pseudo Service 1',
                      tipo: 'Type 1',
                      service: 'Service Type 1',
                      referencia: 'Reference 1',
                      createBy: 'User 1',
                      createAt: '2023-10-15',
                      modifyBy: 'User 2',
                      modifyAt: '2023-10-16',
                      availability: 'Available',
                      duration: 60,
                      isAvailable: true,
                      percent: 100,
                      nextStep: 'Next Step 1',
                    },
                    // Add more test data as needed
                  ],
                },
              }),
          }
        },
        {
          provide: LiveAnnouncer,
          useValue: {},
        },
        {
          provide: AuthenticationService,
          useValue: {
            verify: () =>
              of({
                payload: {
                  id: 'user123',
                },
              }),
            currentUserValue: {
              access_token: 'token123',
            },
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: () =>
              of({
                payload: {
                  user: [
                    {
                      institution: {
                        name: 'Institution 1',
                      },
                    },
                  ],
                },
              }),
          },
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {},
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceRecordComponent);
    component = fixture.componentInstance;
    wfsService = TestBed.inject(WfsService);
    authService = TestBed.inject(AuthenticationService);
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list services on ngAfterViewInit', () => {
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should open create service dialog', () => {
    const openDialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.callThrough();
    component.createService();
    expect(openDialogSpy).toHaveBeenCalledWith(CreateServiceComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        isEditMode: false,
      },
    });
  });

  it('should open edit service dialog', () => {
    const openDialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.callThrough();
    const serviceData = {
      id: 1,
      name: 'Service 1',
      pseudoName: 'Pseudo Service 1',
      tipo: 'Type 1',
      service: 'Service Type 1',
      referencia: 'Reference 1',
      createBy: 'User 1',
      createAt: '2023-10-15',
      modifyBy: 'User 2',
      modifyAt: '2023-10-16',
      availability: 'Available',
      duration: 60,
      isAvailable: true,
      percent: 100,
      nextStep: 'Next Step 1',
    };
    component.editService(serviceData);
    expect(openDialogSpy).toHaveBeenCalledWith(CreateServiceComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        isEditMode: true,
        wfs: serviceData,
      },
    });
  });

})
