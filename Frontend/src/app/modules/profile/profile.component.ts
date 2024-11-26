import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { AuthenticationService } from '@services/authentication.service';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public name = "";
  public email = "";
  public lastname = "";
  public dni = "";
  public region = "";
  public telefono = "";
  public photo:any;
  public enviromentURL = environment.api;
  public url = "";
  constructor(private dialog: MatDialog,private authService:AuthenticationService) {
    console.log(this.authService.currentUserValue);
    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
      console.log(rpt)
      const auth_token = localStorage.getItem('access_token');
      this.name = rpt.payload.name + " " + rpt.payload.lastNames;
      this.email = rpt.payload.email;
      this.dni = rpt.payload.identificationNumber;
      this.name = rpt.payload.name + " " + rpt.payload.lastNames;
      this.region = rpt.payload.region;
      this.telefono = rpt.payload.phone;
      this.photo = rpt.payload.photo;
      this.url = this.enviromentURL+"/files/"+this.photo.id;
      this.url = `${this.url}?token=Bearer ${auth_token}`;
      console.log(this.url)
    })
  }

  ngOnInit(): void {}

  changePasswordModal() {
    this.dialog.open(ChangePasswordModalComponent, {
      width: '600px',
      panelClass: ['dialog-no-padding', 'general-modal'],
    });
  }
}
