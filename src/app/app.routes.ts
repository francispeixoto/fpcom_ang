import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { adminGuard } from './admin/admin.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  }
];
