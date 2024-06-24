import { Routes, provideRouter, withHashLocation, withRouterConfig } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { DoctorsComponent } from './admin-components/doctors/doctors.component';
import { ChatComponent } from './admin-components/chat/chat.component';


export const routes: Routes = [
  {path:"patient",component:MainLayoutComponent,
  children: [
  {path:"",component:HomeComponent}
  ]},
  {path:"admin",component:AdminLayoutComponent,
  children:[
  {path:"",component:AdminComponent},
  {path:"doctor",component:DoctorsComponent},
  {path:"chat",component:ChatComponent},

  ]},
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' }
];

export const appRouterProviders = [
  provideRouter(routes)
];
