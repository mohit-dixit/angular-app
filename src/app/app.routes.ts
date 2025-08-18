import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'home',
    title: 'Home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'overview',
    title: 'Overview',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/aboutus/aboutus.component').then(m => m.AboutusComponent),
  },
  {
    path: 'aboutme',
    title: 'About Me',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/contactus/contactus.component').then(m => m.ContactusComponent),
  },
  {
    path: 'samplecrud',
    title: 'Sample CRUD Operation',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/department/department.component').then(m => m.DepartmentComponent),
  },
  {
    path: 'ngrxexample',
    title: 'NGRX Example',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/ngrx-example/user-form/user-form.component').then(m => m.UserFormComponent),
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () =>
      import('./components/pagenotfound/pagenotfound.component').then(m => m.PagenotfoundComponent),
  },
];
