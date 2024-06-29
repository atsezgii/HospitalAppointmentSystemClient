import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListUser } from '../../models/list-user';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserListApiResponse } from '../../models/list-user-response';
import { UserDataShareService } from '../../services/user-data-share.service';
import { Router } from '@angular/router';
import { ConfirmUserDeleteComponent } from '../confirm-user-delete/confirm-user-delete.component';


@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule,ConfirmUserDeleteComponent],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss"
})
export class UserListComponent implements OnInit {
  users: ListUser[] = [];
  pageRequest: PageRequest = { page: 0, size: 10 };
  count: number = 0;
  subscription: Subscription;
  showModal: boolean = false;
  userToDelete: ListUser | null = null;
  constructor(
    private userService: UserService,
    private userDataShareService: UserDataShareService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  showUserDetails(user: any) {
    console.log("dfgffdögsfömgsöldmöam")
    this.userDataShareService.changeUser(user);
    this.router.navigate(['/user', user.id]);
  }
  loadUsers(): void {
    this.subscription = this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.users = response.items.filter((user:any)=>!user.isDeleted);
        this.count = this.users.length;
        console.log("users", this.users);
        console.log("count", this.count);
      },
      error: (error: any) => {
        console.error("Error loading users:", error);
      }
    });
  }
  // Abonelik iptal edildiğinde (component kapatıldığında vs.) subscription'ı unsubscribe etmek için:
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onPageChange(page: number): void {
    this.pageRequest.page = page;
    this.loadUsers();
  }
  get totalPages(): number {
    return Math.ceil(this.count / this.pageRequest.size);
  }
  showDeleteModal(user: ListUser) {
    this.userToDelete = user;
    this.showModal = true;
  }
  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          this.users = this.users.filter(d => d.id !== this.userToDelete!.id);
          this.showModal = false;
          this.userToDelete = null;
        },
        error: err => {
          console.error('Error deleting user:', err);
          this.showModal = false;
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
    this.userToDelete = null;
  }

}
