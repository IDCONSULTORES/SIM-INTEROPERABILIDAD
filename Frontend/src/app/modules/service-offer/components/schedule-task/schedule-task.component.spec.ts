import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from '@services/toast.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { ScheduleTaskComponent } from './schedule-task.component';
import { of } from 'rxjs';

fdescribe('ScheduleTaskComponent', () => {
  let component: ScheduleTaskComponent;
  let fixture: ComponentFixture<ScheduleTaskComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ScheduleTaskComponent>>;
  let toastService: jasmine.SpyObj<ToastService>;
  let scheduleService: jasmine.SpyObj<ScheduleService>;
  let comparisonService: jasmine.SpyObj<ComparisonService>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    toastService = jasmine.createSpyObj('ToastService', [
      'showInfoToast',
      'showErrorToast',
      'showWarningToast',
    ]);
    comparisonService = jasmine.createSpyObj('ComparisonService', ['postCompare']);
    authService = jasmine.createSpyObj('AuthenticationService', ['verify']);
    userService = jasmine.createSpyObj('UserService', ['getUser']);
    scheduleService = jasmine.createSpyObj('ScheduleService', ['postSchedule']);

    TestBed.configureTestingModule({
      declarations: [ScheduleTaskComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ToastService, useValue: toastService },
        { provide: ScheduleService, useValue: scheduleService },
        { provide: ComparisonService, useValue: comparisonService },
        { provide: AuthenticationService, useValue: authService },
        { provide: UserService, useValue: userService },
      ],
    });

    fixture = TestBed.createComponent(ScheduleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form for scheduled task', fakeAsync(() => {
    // Arrange
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

    toastService.showInfoToast.and.callFake((message) => {
      expect(message).toBe(expectedToastMessage);
    });
    // Act
    const selectElement = fixture.nativeElement.querySelector('#sincronizador');
    expect(selectElement).toBeTruthy();
    selectElement.value = 'Programada';
    scheduleService.postSchedule(formValue)
    component.onSubmit();

    // Assert
    expect(component.taskForm.valid).toBe(true);
    expect(scheduleService.postSchedule).toHaveBeenCalledWith(formValue);

  }));

  // Add more test cases for other methods as needed

});
