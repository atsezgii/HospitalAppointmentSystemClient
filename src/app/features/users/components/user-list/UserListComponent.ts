import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ListUser } from '../../models/list-user';
import { PageRequest } from '../../../../services/common/http-client.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserListApiResponse } from '../../models/list-user-response';
import { UserDataShareService } from '../../services/user-data-share.service';
import { Router } from '@angular/router';



@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss"
})
export class UserListComponent implements OnInit {
  users: ListUser[] = [];
  pageRequest: PageRequest = { page: 0, size: 10 };
  count: number = 0;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private userDataShareService: UserDataShareService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadUsers();
  }
  showUserDetails(user: any) {
    this.userDataShareService.changeUser(user);
    console.log("dfgffdögsfömgsöldmöam",user.id);

    this.router.navigate(['/admin/user', user.id]);
  }
  loadUsers(): void {
    this.subscription = this.userService.read(this.pageRequest).subscribe({
      next: (response: UserListApiResponse) => {
        this.users = response.items;
        this.count = response.count;
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

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
}
