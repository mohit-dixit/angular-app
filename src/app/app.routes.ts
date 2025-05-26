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
    { path: 'aboutus', component: AboutusComponent, title: 'About Us', canActivate: [authGuard] },
    { path: 'contactus', component: ContactusComponent, title: 'Contact Us', canActivate: [authGuard] },
    { path: 'departments', component: DepartmentComponent, title: 'Departments', canActivate: [authGuard] },
    { path: '**', component: PagenotfoundComponent, title: 'Page Not Found' },

];
