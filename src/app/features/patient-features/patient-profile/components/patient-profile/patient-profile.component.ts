import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../users/services/user.service';
import { ListUser } from '../../../../users/models/list-user';
import { AuthService } from '../../../../auth/services/auth.service';
import { PatientService } from '../../../../patients/services/patient.service';
import { ListPatient } from '../../../../patients/models/list-patient';
import { ListPatientResponse } from '../../../../patients/models/list-patient-response';
import { PageRequest } from '../../../../../services/common/http-client.service';

@Component({
  selector: "app-patient-profile",
  standalone: true,
  imports: [],
  templateUrl: "./patient-profile.component.html",
  styleUrl: "./patient-profile.component.scss"
})
export class PatientProfileComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 10 };
  user: ListUser;
  patient: ListPatient;
  errorMessage: any;
  userId:any
  age: number | null = null;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private patientService:PatientService
  ) {}
  ngOnInit(): void {
 this.getUser();
 this.getPatients();
  }

  getUser(){
    const userId= Number(this.authService.getCurrentUserId());
    this.userService.getUser(userId).subscribe({
      next: userData => {
        this.user = userData;
        this.age = this.calculateAge(new Date(this.user.birthDate));

        console.log("user", this.user);
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }
  getPatients(){
    const userId= Number(this.authService.getCurrentUserId());
    console.log("userId", userId);
    this.patientService.read(this.pageRequest).subscribe({
      next: (response: ListPatientResponse) => {
        console.log("patients:", response.items);  // Veriyi kontrol et
        this.patient = response.items.find(patient => patient.userId === userId) || null;
        console.log("patients:",this.patient );  // Veriyi kontrol et
      },
      error: (error: any) => {
        console.error("Error loading patients:", error);
      }
    });
  }
  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  }


