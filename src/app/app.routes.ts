import { Routes } from '@angular/router';
import { Imprint } from './imprint/imprint';
import { MainContent } from './main-content/main-content';
import { Privacy } from './privacy/privacy';

export const routes: Routes = [
  { path: '', component: MainContent},
  { path: 'imprint', component: Imprint },
  { path: 'privacy', component: Privacy },
];
