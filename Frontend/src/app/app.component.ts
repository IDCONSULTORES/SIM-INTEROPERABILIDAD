import { Component, HostListener } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { UserQuery } from './store/user.query';
import { UserStore } from './store/user.store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'psi-front';
  showSiderBar = false;
  sidebarOpen = true;
  isMobileVersion = false;

  constructor(

    private router: Router,
    private authService:AuthenticationService,
    private userStore: UserStore,
    private userQuery: UserQuery,
  ) {


    if (window.innerWidth < 1024) {
      this.isMobileVersion = true;
      this.sidebarOpen = false;
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.sidebarOpen = false;
        }
      });
    }
    this.authService.currentUser.subscribe((userCredentials) => {
      if (userCredentials && userCredentials.access_token) {
        this.showSiderBar = true;
        const userCache = this.userQuery.getInformation();
        console.log(userCache)
        if (userCache.id) {
          return;
        }
        console.log('No User on Cache');
        this.userStore.update((_) => ({
          ...userCredentials,
        }));
      } else {
        this.showSiderBar = false;
      }
    });
    


  }


}
