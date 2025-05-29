import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { DepartmentComponent } from './components/department/department.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, title: 'Login'},
    { path: 'home', component: DashboardComponent, title: 'Home', canActivate: [authGuard] },
    { path: 'overview', component: AboutusComponent, title: 'Overview', canActivate: [authGuard] },
    { path: 'aboutme', component: ContactusComponent, title: 'About Me', canActivate: [authGuard] },
    { path: 'samplecrud', component: DepartmentComponent, title: 'Sample CRUD Operation', canActivate: [authGuard] },
    { path: '**', component: PagenotfoundComponent, title: 'Page Not Found' }
];
