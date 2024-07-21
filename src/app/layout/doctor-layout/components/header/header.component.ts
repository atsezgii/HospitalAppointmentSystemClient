import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  constructor(private authService : AuthService){}
  user:string;

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
