import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../services/doctor.service';
import { CreateDoctor } from '../../models/create-doctor';

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.scss'
})
export class AddDoctorComponent implements OnInit{
newDoctorFormGroup!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private doctorService:DoctorService){}


  ngOnInit(): void {
    this.createForm();
  }

private createForm() {
  this.newDoctorFormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    biography: [''],
    gender: [''],
    specialistLevel: [''],
    password: [''],
    departmentId: [''],
    address: [''],
  });
}
addDoctor(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
  if (this.newDoctorFormGroup.valid) {
    const doctor: CreateDoctor = {
      firstName: this.newDoctorFormGroup.get('firstName')?.value ,
      lastName: this.newDoctorFormGroup.get('lastName')?.value,
      gender:1,
      email:this.newDoctorFormGroup.get('email')?.value,
      photoUrl:"string",
      phoneNumber: this.newDoctorFormGroup.get('phoneNumber')?.value,
      address:this.newDoctorFormGroup.get('address')?.value,
      password:this.newDoctorFormGroup.get('password')?.value,
      departmentId:1,
      specialistLevel:this.newDoctorFormGroup.get('specialistLevel')?.value,
      biography: this.newDoctorFormGroup.get('biography')?.value
    };
    console.log("formDoc", doctor);
    this.doctorService.create(doctor, successCallBack, errorCallBack);
  } else {
    console.log("Form is not valid");
    if (errorCallBack) {
      errorCallBack('Form is not valid');
    }
  }
}

onFormSubmit() {
  if (this.newDoctorFormGroup.invalid) {
    console.log("form",this.newDoctorFormGroup);
    console.error('Form is invalid');
    return;
  }

  this.addDoctor();
}

}
