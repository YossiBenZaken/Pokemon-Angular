import { Routes } from '@angular/router';

export const InformationRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'game-info',
  },
  {
    path: 'game-info',
    loadComponent: () =>
      import('./game-info/game-info.component').then(
        (m) => m.GameInfoComponent
      ),
  },
  {
    path: 'pokemon-info',
    loadComponent: () =>
      import('./pokemon-info/pokemon-info.component').then(
        (m) => m.PokemonInfoComponent
      ),
  },
];
