import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { UserService } from '../../features/users/services/user.service';

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.scss"
})
export class AdminComponent {
}
