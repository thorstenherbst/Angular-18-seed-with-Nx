import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'tttgame',
    loadChildren: () => import('tttgame/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'frontend',
    loadChildren: () => import('frontend/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
