import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserQuery } from '@app/store/user.query';
import { UserState } from '@app/store/user.store';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userData: UserState | null = null;
  community_selected: string | null = null;
  @Input()
  sidebarOpen = true;
  itemOpened = -1;
  email = ""




  constructor(

    private userQuery: UserQuery,
    private router: Router,
    private authService:AuthenticationService,
    private userService:UserService

  ) {
    this.userQuery.selectUserId.subscribe((user) => {
      this.userData = this.userQuery.getInformation();
      
    });

    this.authService.verify(  {token: this.authService.currentUserValue.access_token}  ).subscribe((res:any)=>{

      const userData2 = res.payload;
      console.log(userData2);
      this.email = userData2.email;  
      //this.user_name = this.userData2.payload['name'];
    });


  }
  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  changeSelectedCommunity(id_community: string) {
    this.community_selected = id_community;
  }

  identify(index: any, item: any) {
    return item.name;
  }
}

