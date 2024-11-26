import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ServiceOfferComponent } from '@modules/service-offer/service-offer.component';
import { ServiceDemandComponent } from '@modules/service-demand/service-demand.component';
import { DashboardComponent } from '@modules/dashboard/dashboard.component';
import { SettingsComponent } from '@modules/settings/settings.component';
import { ProfileComponent } from '@modules/profile/profile.component';
import { ServiceRecordComponent } from '@modules/service-record/service-record/service-record.component';
import { MainPageComponent } from '@modules/service-availability/main-page/main-page.component';
const routes: Routes = [
  // Login
  {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'restablecer-contrasena',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./modules/reset-password/reset-password.module').then(
        (m) => m.ResetPasswordModule
      ),
  },

  // Service-Record
  {
    path: 'registro-de-servicios',
    component: ServiceRecordComponent,
    loadChildren: () =>
      import('./modules/service-record/service-record.module').then(
        (m) => m.ServiceRecordModule
      ),
    canActivate: [AuthGuard],
  },

  // Availability
  {
    path: 'disponibilidad',
    component: MainPageComponent,
    loadChildren: () =>
      import('./modules/service-availability/service-availability.module').then(
        (m) => m.ServiceAvailabilityModule
      ),
    canActivate: [AuthGuard],
  },

  // Service-Offer
  {
    path: 'oferta-de-servicios',
    component: ServiceOfferComponent,
    loadChildren: () =>
      import('./modules/service-offer/service-offer.module').then(
        (m) => m.ServiceOfferModule
      ),
    canActivate: [AuthGuard],
  },

  // Service-demand
  {
    path: 'demandas-programadas',
    component: ServiceDemandComponent,
    loadChildren: () =>
      import('./modules/service-demand/service-demand.module').then(
        (m) => m.ServiceDemandModule
      ),
    canActivate: [AuthGuard],
  },

  // Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  // Settings
  {
    path: 'configuracion',
    component: SettingsComponent,
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
    canActivate: [AuthGuard],
  },
  // User-register
  {
    path: 'registro-de-usuarios',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./modules/user-register/user-register.module').then(
        (m) => m.UserRegisterModule
      ),
    canActivate: [AuthGuard],
  },
  // User-register
  {
    path: 'perfil',
    component: ProfileComponent,
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'lista-usuarios',
    component: HomeLayoutComponent,
    loadChildren: () =>
      import('./modules/user-registration/user-registration.module').then(
        (m) => m.UserRegistrationModule
      ),
    canActivate: [AuthGuard],
    data: { onlyAdmin: true },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
