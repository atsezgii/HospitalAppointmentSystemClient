import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../../../services/alertify/alertify.service';
import { DepartmentDataShareService } from '../../services/department-data-share.service';
import { ListDepartment } from '../../models/list-department';
import { DepartmentService } from '../../services/department.service';
import { MessageType } from '../../../../services/alertify/enums/MessageType';
import { Position } from '../../../../services/alertify/enums/Position';

@Component({
  selector: 'app-update-department',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-department.component.html',
  styleUrl: './update-department.component.scss'
})
export class UpdateDepartmentComponent implements OnInit{

  departmentDetailFormGroup: FormGroup;
  department: ListDepartment;

  constructor(private formBuilder: FormBuilder,
    private departmentService:DepartmentService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private departmentDataShareService: DepartmentDataShareService,
  ){}


  ngOnInit(): void {
    this.createForm();
    this.getDetailOfDepartment();
  }

  private createForm() {
    this.departmentDetailFormGroup = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["",[Validators.required]],
      description: ["",[Validators.required]]
    });
  }
  private getDetailOfDepartment() {
    this.route.paramMap.subscribe(params => {
      const departmentId = +params.get("id");
      console.log("id",departmentId)
      this.departmentDataShareService.currentDepartment.subscribe(department => {
        if (department && department.id === departmentId) {
          this.department = department;
          this.departmentDetailFormGroup.patchValue(department);
        }
      });
    });
  }
  updateDepartment() {
    this.departmentService.updateDepartment(this.departmentDetailFormGroup.value).subscribe(
      response => {
        console.log('Department updated:', response);
        this.alertify.message("Success", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        this.router.navigate(['/admin/departments']);
      },
      error => {
        console.error('Department could not be updated:', error);
        this.alertify.message("Form is not valid", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    );
  }
  onSubmit() {
    if (this.departmentDetailFormGroup.invalid) {
      this.alertify.message("Form is not valid", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.updateDepartment();
  }

}
