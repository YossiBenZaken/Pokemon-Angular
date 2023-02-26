import { Routes } from '@angular/router';
import { UserGuardService } from './guards/user.guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'beginning',
    loadComponent: () =>
      import('./pages/beginning/beginning.component').then(
        (m) => m.BeginningComponent
      ),
    // canActivate: [UserGuardService],
  },
  {
    path: 'choose-pokemon',
    loadComponent: () =>
      import('./pages/choose-pokemon/choose-pokemon.component').then(
        (m) => m.ChoosePokemonComponent
      ),
    // canActivate: [UserGuardService],
  },
  {
    path: 'information',
    loadChildren: () =>
      import('./pages/information/information.routes').then(
        (m) => m.InformationRoutes
      ),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./pages/statistics/statistics.component').then(
        (m) => m.StatisticsComponent
      ),
  },
  {
    path: 'rankinglist',
    loadComponent: () =>
      import('./pages/rankinglist/rankinglist.component').then(
        (m) => m.RankinglistComponent
      ),
  },
  {
    path: 'account-options',
    loadChildren: () =>
      import('./pages/account-options/account-options.routes').then(
        (m) => m.InformationRoutes
      ),
  },
  {
    path: 'promotion',
    loadComponent: () =>
      import('./pages/promotion/promotion.component').then(
        (m) => m.PromotionComponent
      ),
  },
  {
    path: 'buddies',
    loadComponent: () =>
      import('./pages/buddies/buddies.component').then(
        (m) => m.BuddiesComponent
      ),
  },
];
