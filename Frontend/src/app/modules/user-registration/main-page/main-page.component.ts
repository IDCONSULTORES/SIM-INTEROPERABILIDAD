import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '@services/toast.service';
// import {
//   SUCCESS_CREATE_MESSAGE,
//   SUCCESS_UPDATE_MESSAGE,
//   WARNING_INCOMPLETE_FORM_MESSAGE,
// } from '@app/helpers/consts';
import { UserService } from '@services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalDeletePermissionsComponent } from '../components/modal-delete-permissions/modal-delete-permissions.component';
import { error } from 'cypress/types/jquery';
// import { themesName } from '@app/helpers/themes';

@Component({
  selector: 'app-user-registration',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public createUserForm: FormGroup;

  public isEditMode = false;
  public userID: any = null;
  public allowEditField = false;

  public syncWithServer = false;

  // Table Properties
  public displayedColumns = [
    'order',
    'name',
    'lastName',
    'dni',
    'phone',
    'email',
    'institution',
    'institutionType',
    'region',
    'donwload',
  ];

  public page = 0;
  public size = 1000;
  public queryBy = null;
  public queryValue = null;
  public sortBy = null;
  public sortAscending: any = true;

  public dataSource: any = new MatTableDataSource([]);

  public columns = [
    {
      name: 'Nombre',
      value: 'name',
    },
    {
      name: 'Apellido Paterno',
      value: 'lastName',
    },
    {
      name: 'DNI',
      value: 'dni',
    },
    {
      name: 'Teléfono',
      value: 'phone',
    },
    {
      name: 'Correo',
      value: 'email',
    },
    {
      name: 'Institución',
      value: 'institution',
    },
    {
      name: ' Tipo de Institución',
      value: 'institutionType',
    },
    {
      name: 'Región',
      value: 'region',
    },
  ];
  // public themes = themesName;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private matDialog: MatDialog
  ) {
    this.listAllUsers();
    this.createUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      motherLastName: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      personalEmail: ['', Validators.required],
      workEmail: ['', Validators.required],
      workArea: [null, Validators.required],
      workPosition: ['', Validators.required],
      type: [null, Validators.required],
      admissionDate: ['', Validators.required],
      contractType: [null, Validators.required],
      color: 'is-green',
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  applyFilter(event: any) {
    const { text = null, key = null } = event;
    this.queryBy = key;
    this.queryValue = text;
    this.listAllUsers();
  }

  onSortChange(event: any) {
    console.log(event);
    const { active, direction } = event;
    if (direction) {
      this.sortBy = active;
      this.sortAscending = direction === 'asc';
    } else {
      this.sortBy = null;
      this.sortAscending = null;
    }
    this.listAllUsers();
    this.dataSource.sort = this.sort;
  }

  listAllUsers() {
    this.userService.getAllDataUser().subscribe(
      (rpta: any) => {
        this.dataSource = rpta;
        console.log('Combine Data', rpta);
      },
      (error) => {
        console.log('ERRROR ', error);
      }
    );
  }

  resetPassword() {
    // this.userService.resetUserPassword(this.createUserForm.get('workEmail')?.value).subscribe({
    //   next: (_) => {
    //     this.toastService.showInfoToast('Se ha enviado una nueva contraseña');
    //   },
    //   error: (_) => {
    //     this.toastService.showErrorToast('No se ha podido cambiar la contraseña');
    //   },
    // });
  }

  onSubmit() {
    // if (this.createUserForm.invalid) {
    //   this.toastService.showWarningToast(WARNING_INCOMPLETE_FORM_MESSAGE);
    // } else {
    //   this.syncWithServer = true;
    //   if (this.isEditMode) {
    //     const data = { ...this.createUserForm.value, active: true };
    //     this.userService.editUser(this.userID, data).subscribe((_) => {
    //       this.syncWithServer = false;
    //       this.toastService.showInfoToast(SUCCESS_UPDATE_MESSAGE);
    //     });
    //   } else {
    //     this.userService.registerUser(this.createUserForm.value).subscribe((_) => {
    //       this.createUserForm.reset();
    //       this.syncWithServer = false;
    //       this.toastService.showInfoToast(SUCCESS_CREATE_MESSAGE);
    //     });
    //   }
    // }
  }

  editRow(userData: any) {
    this.resetForm();
    this.createUserForm.disable();
    this.isEditMode = true;
    this.allowEditField = false;

    let { id, ...data } = userData;

    this.userID = id;

    // this.createUserForm.patchValue({
    //   admissionDate: this.tranformToString(admissionDate),
    //   ...data,
    // });
  }

  enableEdition() {
    this.createUserForm.enable();
  }

  tranformToString(date: string) {
    return new Date(date).toISOString().substring(0, 10);
  }

  resetForm() {
    this.createUserForm.reset();
    this.isEditMode = false;
    this.allowEditField = true;
  }

  showConfirmationModalToRevocatePermissions(event: any, id: any) {
    event.preventDefault();
    const dialogModal = this.matDialog.open(ModalDeletePermissionsComponent, {
      width: '450px',
      panelClass: 'dialog-no-padding',
      data: { id },
    });

    dialogModal.afterClosed().subscribe((result) => {
      console.log('RESULT', result);
      this.userService.deleteUser(result.id).subscribe(
        (rpta) => {
          this.userService.deleteUserSIM(result.id).subscribe(
            (next) =>
              this.toastService.showInfoToast('User deleted Successfully'),
            (error) =>
              this.toastService.showErrorToast('User cannot be deleted')
          );
        },
        (error) => {
          this.toastService.showErrorToast('User cannot be deleted');
        }
      );
    });
  }

  removePermissions() {}
}
