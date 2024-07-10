import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { ListDepartment } from '../features/departments/models/list-department';
import { DepartmentService } from '../features/departments/services/department.service';
import { PageRequest } from '../services/common/http-client.service';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../pipes/Truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  pageRequest: PageRequest = { page: 0, size: 10 };
  departments: ListDepartment[] = [];
  subscriptions: Subscription[] = [];
  count: number = 0;
  showModal: boolean = false;
  constructor(
    private departmentService: DepartmentService,
  ) {}
  ngOnInit(): void {
    this.loadDepartments();
  }
  loadDepartments() {
    const departmentsSubscription = this.departmentService.read(this.pageRequest).subscribe({
      next: response => {
        this.departments = response.items//.filter((department: any) => !department.isDeleted);
        this.count =response.count;
        console.log("depsssss", this.departments);
      },
      error: err => {
        console.error('Department load failed', err);
      }
    });
    this.subscriptions.push(departmentsSubscription);
  }
}
