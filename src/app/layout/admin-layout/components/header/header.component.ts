import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user:string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getCurrentUser()
   }
logout() {
  this.authService.logout();}
  getCurrentUser(){
    this.user = this.authService.getCurrentUserName();
    console.log('Current User ID:', this.user);
  }
}
