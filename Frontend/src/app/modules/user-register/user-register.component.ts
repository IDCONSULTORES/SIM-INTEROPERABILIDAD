import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  selectedProfile: string = '1';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToForm() {
    const route = `${this.selectedProfile === '1' ? 'instituto' : 'admin'}`;
    this.router.navigate([`/registro-de-usuarios/${route}`]);
  }
}
