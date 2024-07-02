import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListDoctor } from '../../models/list-doctor';
import { DoctorService } from '../../services/doctor.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorDataShareService } from '../../services/doctor-data-share.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { DepartmentService } from '../../../departments/services/department.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { ListDepartment } from '../../../departments/models/list-department';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './doctor-detail.component.html',
  styleUrl: './doctor-detail.component.scss'
})
export class DoctorDetailComponent implements OnInit{

  doctorDetailFormGroup: FormGroup;
  doctor: ListDoctor;
  pageRequest: PageRequest = { page: 0, size: 20 };
  departments: ListDepartment[] = [];
  constructor(private formBuilder: FormBuilder,
    private doctorService:DoctorService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private doctorDataShareService: DoctorDataShareService,
    private departmentService:DepartmentService
  ){}
  ngOnInit(): void {
    this.createForm();
    this.getDetailOfDoctor();
    this.loadDepartments();
  }
  private createForm() {
    this.doctorDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      biography: ["",[Validators.required]],
      specialistLevel: ["",[Validators.required]],
      userId: ["",[Validators.required]],
      departmentId: ["",[Validators.required]],
      yearsOfExperience: ["",[Validators.required]],
    });
  }
  private getDetailOfDoctor() {
    this.route.paramMap.subscribe(params => {
      const doctorId = +params.get("id");
      console.log("id",doctorId)
      this.doctorDataShareService.currentDoctor.subscribe(doctor => {
        if (doctor && doctor.id === doctorId) {
          this.doctor = doctor;
          this.doctorDetailFormGroup.patchValue(doctor);
        }
      });
    });
  }
  updatedoctor() {

    this.doctorService.updateDoctor(this.doctorDetailFormGroup.value).subscribe(
      response => {
        console.log('doctor updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/admin/doctors']);
      },
      error => {
        console.error('doctor could not be updated:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  loadDepartments(): void {

    this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items;
        console.log("deps", this.departments);
      },
      error: err => {
        console.error("Department load failed", err);
      }
    });
  }
  onSubmit() {
    console.log('doctor updated:', this.doctorDetailFormGroup.value);

    if (this.doctorDetailFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updatedoctor();
  }
}
