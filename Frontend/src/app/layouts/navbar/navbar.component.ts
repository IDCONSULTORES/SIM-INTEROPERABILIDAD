import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserQuery } from '@app/store/user.query';
import { UserState } from '@app/store/user.store';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { PopnavbarComponent } from '../popnavbar/popnavbar.component';
PopnavbarComponent


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  display = true;
  userData: UserState | null = null;
  userData2:any ;
  institution = ""
  @Output()
  emitToogle = new EventEmitter();
  public user_name = '';
  public role = '';
  constructor(
    private userQuery: UserQuery,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private userService:UserService

  ) {
    
    this.userQuery.selectUserId.subscribe((user) => {
      this.userData = this.userQuery.getInformation();

      console.log(this.userData);
      
      //this.user_name = this.userData['name'];

      //console.log(this.user_name);
      
    });


    this.authService.verify(  {token: this.authService.currentUserValue.access_token}  ).subscribe((res:any)=>{

      this.userData2 = res.payload;
      console.log(this.userData2);
      this.userService.getUser(this.userData2.id).subscribe((rpt2:any) => {
        this.institution = rpt2.payload.user[0].institution.name;
      })      
      //this.user_name = this.userData2.payload['name'];
    });



    
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {

  }

  go_to_notificacion() {}

  scheduleAttributes() {
    this.dialog.open(PopnavbarComponent, {
      width: '780px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      
    });
  }

  logout() {
    this.authService.logout();
  }

  toogleMenu() {
    this.emitToogle.emit();
  }




}

