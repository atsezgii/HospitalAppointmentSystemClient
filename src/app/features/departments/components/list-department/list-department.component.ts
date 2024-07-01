import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department.service';
import { PageRequest } from '../../../../services/common/http-client.service';
import { ListDepartment } from '../../models/list-department';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DepartmentDataShareService } from '../../services/department-data-share.service';
import { Router } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { UserService } from '../../../users/services/user.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-department',
  standalone: true,
  imports: [CommonModule,ConfirmDeleteModalComponent],
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss'] // "styleUrl" değil "styleUrls" olmalı
})
export class ListDepartmentComponent implements OnInit, OnDestroy {
  pageRequest: PageRequest = { page: 0, size: 10 };
  departments: ListDepartment[] = [];
  subscriptions: Subscription[] = [];
  count: number = 0;
  showModal: boolean = false;
  departmentToDelete: ListDepartment | null = null;
  userId:any
  constructor(
    private departmentService: DepartmentService,
    private departmentDataShareService: DepartmentDataShareService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDepartments();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  showDepartmentDetails(department: any) {
    this.departmentDataShareService.changeUser(department);
    console.log("dfgffdögsfömgsöldmöam", department.id);
    this.router.navigate(['/admin/department', department.id]);
  }
  showDeleteModal(department: ListDepartment) {
    this.departmentToDelete = department;
    this.showModal = true;
  }

  confirmDelete() {
    if (this.departmentToDelete) {
      this.departmentService.deleteDepartment(this.departmentToDelete.id).subscribe({
        next: () => {
          this.departments = this.departments.filter(d => d.id !== this.departmentToDelete!.id);
          this.showModal = false;
          this.departmentToDelete = null;
        },
        error: err => {
          console.error('Error deleting department:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.departmentToDelete = null;
  }

  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadDepartments();
  }

  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
