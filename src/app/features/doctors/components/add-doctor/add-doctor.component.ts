import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { CreateDoctor } from '../../models/create-doctor';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';
import { ListDepartment } from '../../../departments/models/list-department';
import { DepartmentService } from '../../../departments/services/department.service';
import { ListDepartmentResponse } from '../../../departments/models/list-department-response';
import { PageRequest } from '../../../../services/common/http-client.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: "app-add-doctor",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./add-doctor.component.html",
  styleUrl: "./add-doctor.component.scss"
})
export class AddDoctorComponent implements OnInit {
  newDoctorFormGroup: FormGroup;
  departments: ListDepartment[] = [];
  pageRequest: PageRequest = { page: 0, size: 20 };
  count: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadDepartments();
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
  private createForm() {
    this.newDoctorFormGroup = this.formBuilder.group({
      biography: ["",[Validators.required]],
      specialistLevel: ["",[Validators.required]],
      userId: ["",[Validators.required]],
      departmentId: ["",[Validators.required]],
      yearsOfExperience: ["",[Validators.required]],
    });
  }
  addDoctor(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.newDoctorFormGroup.valid) {
      // const doctor: CreateDoctor = {
      //   firstName: this.newDoctorFormGroup.get('firstName')?.value ,
      //   lastName: this.newDoctorFormGroup.get('lastName')?.value,
      //   gender:1,
      //   email:this.newDoctorFormGroup.get('email')?.value,
      //   photoUrl:"string",
      //   phoneNumber: this.newDoctorFormGroup.get('phoneNumber')?.value,
      //   address:this.newDoctorFormGroup.get('address')?.value,
      //   password:this.newDoctorFormGroup.get('password')?.value,
      //   departmentId:this.newDoctorFormGroup.get('departmentId')?.value,
      //   specialistLevel:this.newDoctorFormGroup.get('specialistLevel')?.value,
      //   biography: this.newDoctorFormGroup.get('biography')?.value
      // };
      this.doctorService.create(
        this.newDoctorFormGroup.value,
        successCallBack,
        errorCallBack
      );
      console.log("va", this.newDoctorFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.newDoctorFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      errorCallBack("Form is not valid");
    }
  }

  onFormSubmit() {
    if (this.newDoctorFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addDoctor();
  }
}
