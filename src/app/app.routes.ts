import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  {path:"",component:MainLayoutComponent,children: [
  {path:"",component:HomeComponent}
  ]},
  {path:"admin",component:AdminLayoutComponent, children:[
  {path:"",component:AdminComponent}
  ]}
];
