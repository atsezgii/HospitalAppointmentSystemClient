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
import { PatientsComponent } from './admin-components/patients/patients.component';
import { DepartmentsComponent } from './admin-components/departments/departments.component';
import { AddDepartmentComponent } from './features/departments/components/add-department/add-department.component';
import { UpdateDepartment } from './features/departments/models/update-department';
import { UpdateDepartmentComponent } from './features/departments/components/update-department/update-department.component';
import { ListFeedbackComponent } from './features/feedbacks/components/list-feedback/list-feedback.component';
import { FeedbacksComponent } from './admin-components/feedbacks/feedbacks.component';
import { UpdateFeedbackComponent } from './features/feedbacks/components/update-feedback/update-feedback.component';
import { AddFeeedbackComponent } from './features/feedbacks/components/add-feeedback/add-feeedback.component';
import { OperationClaimsComponent } from './admin-components/operation-claims/operation-claims.component';
import { UpdateOperationClaimComponent } from './features/operation-claims/components/update-operation-claim/update-operation-claim.component';
import { AddOperationClaimComponent } from './features/operation-claims/components/add-operation-claim/add-operation-claim.component';
import { UserOperationClaimsComponent } from './admin-components/user-operation-claims/user-operation-claims.component';
import { AddUserClaimComponent } from './features/user-operation-claims/components/add-user-claim/add-user-claim.component';
import { AddUserComponent } from './features/users/components/add-user/add-user.component';
import { DoctorDetailComponent } from './features/doctors/components/doctor-detail/doctor-detail.component';
import { UpdatePatientComponent } from './features/patients/components/update-patient/update-patient.component';
import { AddPatientComponent } from './features/patients/components/add-patient/add-patient.component';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { DoctorScheduleComponent } from './features/doctor-features/doctor-schedule/doctor-schedule.component';
import { PatientProfileComponent } from './features/patient-features/patient-profile/components/patient-profile/patient-profile.component';
import { ListDoctorsComponent } from './features/patient-features/list-doctors/components/list-doctors/list-doctors.component';
import { ListDepartmentsComponent } from './features/patient-features/list-departments/list-departments/list-departments.component';
import { ContactComponent } from './features/patient-features/contact/contact/contact.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login rotası
  { path: 'register', component: RegisterComponent }, // Login rotası

  {path:"patient",component:MainLayoutComponent,
  children: [
  {path:"",component:HomeComponent,canActivate: [authGuard]},
  {path:"profile",component:PatientProfileComponent,canActivate: [authGuard]},
  {path:"doctors",component:ListDoctorsComponent,canActivate: [authGuard]},
  {path:"departments",component:ListDepartmentsComponent,canActivate: [authGuard]},
  {path:"contact",component:ContactComponent,canActivate: [authGuard]},
  ]},

  {path:"doctor",component:DoctorLayoutComponent,
    children: [
    {path:"",component:DoctorDashboardComponent,canActivate: [authGuard]},
  {path:"schedule",component:DoctorScheduleComponent,canActivate: [authGuard]},

    ]},

  {path:"admin",component:AdminLayoutComponent,
  children:[
  {path:"",component:AdminComponent,canActivate: [authGuard]},

  {path:"doctors",component:DoctorsComponent,canActivate: [authGuard]},
  { path:'doctor/:id', component: DoctorDetailComponent ,canActivate: [authGuard]},
  {path:"adddoctor",component:AddDoctorComponent,canActivate: [authGuard]},

  {path:"chat",component:ChatComponent,canActivate: [authGuard]},

  {path:"users",component:UsersComponent,canActivate: [authGuard]},
  {path:"addUser",component:AddUserComponent,canActivate: [authGuard]},
  { path:'user/:id', component: UserDetailComponent ,canActivate: [authGuard]},

  {path:"patients",component:PatientsComponent,canActivate: [authGuard]},
  {path:"addPatient",component:AddPatientComponent,canActivate: [authGuard]},
  { path:'patient/:id', component: UpdatePatientComponent ,canActivate: [authGuard]},

  {path:"feedbacks",component:FeedbacksComponent,canActivate: [authGuard]},
  { path:'feedback/:id', component:UpdateFeedbackComponent ,canActivate: [authGuard]},
  {path:"addFeedback",component:AddFeeedbackComponent,canActivate: [authGuard]},


  {path:"departments",component:DepartmentsComponent,canActivate: [authGuard]},
  {path:"addDepartment",component:AddDepartmentComponent,canActivate: [authGuard]},
  { path:'department/:id', component:UpdateDepartmentComponent ,canActivate: [authGuard]},

  {path:"claims",component:OperationClaimsComponent,canActivate: [authGuard]},
  {path:"claim/:id",component:UpdateOperationClaimComponent,canActivate: [authGuard]},
  {path:"addClaim",component:AddOperationClaimComponent,canActivate: [authGuard]},

  {path:"userclaims",component:UserOperationClaimsComponent,canActivate: [authGuard]},
  {path:"addUserClaim",component:AddUserClaimComponent,canActivate: [authGuard]},
  {path:"userclaim/:id",component:UserOperationClaimsComponent,canActivate: [authGuard]},

  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },// Varsayılan rota login
  { path: '**', redirectTo: '/login' }// Bilinmeyen rotalar için yönlendirme login
];

export const appRouterProviders = [
  provideRouter(routes)
];
