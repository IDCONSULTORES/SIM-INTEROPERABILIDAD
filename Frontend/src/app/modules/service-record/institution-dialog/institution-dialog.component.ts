import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WfsService } from '@services/wfs.service';
import { ToastService } from '@services/toast.service';
import { AuthenticationService } from '@services/authentication.service';
import { ComparisonService } from '@services/comparison.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-institution-dialog',
  templateUrl: './institution-dialog.component.html',
  styleUrls: ['./institution-dialog.component.scss']
})
export class InstitutionDialogComponent implements OnInit {
  userId = ""
  constructor(public dialogRef: MatDialogRef<InstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      
    }

  ngOnInit(): void {
  }

  yes()
  {
    this.dialogRef.close(true)
  }
  no()
  {
    this.dialogRef.close(false)
  }
}
