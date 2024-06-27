import { Component } from '@angular/core';
import { UserListComponent } from '../../features/users/components/user-list/UserListComponent';
import { UserDetailComponent } from '../../features/users/components/user-detail/user-detail.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserListComponent,UserDetailComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
