import { Routes } from '@angular/router';

export const HouseRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bringaway',
  },
  {
    path: 'bringaway',
    loadComponent: () =>
      import('./bringaway/bringaway.component').then(
        (m) => m.BringawayComponent
      ),
  },
  {
    path: 'pickup',
    loadComponent: () =>
      import('./pickup/pickup.component').then((m) => m.PickupComponent),
  },
  {
    path: 'release',
    loadComponent: () =>
      import('./release/release.component').then((m) => m.ReleaseComponent),
  },
];
