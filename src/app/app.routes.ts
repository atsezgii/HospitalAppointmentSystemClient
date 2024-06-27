import { Routes, provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { DoctorsComponent } from './admin-components/doctors/doctors.component';
import { ChatComponent } from './admin-components/chat/chat.component';
import { AddDoctorComponent } from './features/doctors/components/add-doctor/add-doctor.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register/register.component';
import { UsersComponent } from './admin-components/users/users.component';
import { UserDetailComponent } from './features/users/components/user-detail/user-detail.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login rotası
  { path: 'register', component: RegisterComponent }, // Login rotası

  {path:"patient",component:MainLayoutComponent,
  children: [
  {path:"",component:HomeComponent,canActivate: [authGuard]}
  ]},



  {path:"admin",component:AdminLayoutComponent,
  children:[
  {path:"",component:AdminComponent,canActivate: [authGuard]},
  {path:"doctor",component:DoctorsComponent,canActivate: [authGuard]},
  {path:"adddoctor",component:AddDoctorComponent,canActivate: [authGuard]},
  {path:"chat",component:ChatComponent,canActivate: [authGuard]},
  {path:"users",component:UsersComponent,canActivate: [authGuard]},
  { path:'user/:id', component: UserDetailComponent ,canActivate: [authGuard]}

  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },// Varsayılan rota login
  { path: '**', redirectTo: '/login' }// Bilinmeyen rotalar için yönlendirme login
];

export const appRouterProviders = [
  provideRouter(routes)
];
