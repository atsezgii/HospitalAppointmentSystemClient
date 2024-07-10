import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../departments/services/department.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { ListDepartment } from '../../../departments/models/list-department';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-departments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-departments.component.html',
  styleUrl: './list-departments.component.scss'
})
export class ListDepartmentsComponent implements OnInit {
  pageRequest: PageRequest = { page: 0, size: 10 };
  departments: ListDepartment[] = [];
  subscriptions: Subscription[] = [];

  constructor(private departmentService:DepartmentService){}
  ngOnInit(): void {
    this.loadDepartments();
  }


  loadDepartments() {
    const departmentsSubscription = this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items//.filter((department: any) => !department.isDeleted);
        console.log("depsssss", this.departments);
      },
      error: err => {
        console.error('Department load failed', err);
      }
    });
    this.subscriptions.push(departmentsSubscription);
  }
}
