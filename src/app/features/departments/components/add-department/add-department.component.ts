import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.scss'
})
export class AddDepartmentComponent implements OnInit{
  departmenFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private alertify: AlertifyService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.departmenFormGroup = this.formBuilder.group({
      name: ["",[Validators.required]],
      description: ["",[Validators.required]]
    });
  }

  addDepartment(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    if (this.departmenFormGroup.valid) {

      this.departmentService.create(
        this.departmenFormGroup.value,
        successCallBack,
        errorCallBack
      );
      console.log("va", this.departmenFormGroup.value)
      this.alertify.message("Success", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.departmenFormGroup.reset();
    } else {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
    if (errorCallBack) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }
  onFormSubmit() {
    if (this.departmenFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.addDepartment();
  }
}
