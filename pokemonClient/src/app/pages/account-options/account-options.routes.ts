import { Routes } from '@angular/router';

export const InformationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'personal',
  },
  {
    path: 'personal',
    loadComponent: () =>
      import(
        './account-options-personal/account-options-personal.component'
      ).then((m) => m.AccountOptionsPersonalComponent),
  },
  {
    path: 'password',
    loadComponent: () =>
      import(
        './account-options-password/account-options-password.component'
      ).then((m) => m.AccountOptionsPasswordComponent),
  },
  {
    path: 'restart',
    loadComponent: () =>
      import(
        './account-options-restart/account-options-restart.component'
      ).then((m) => m.AccountOptionsRestartComponent),
  },
];
