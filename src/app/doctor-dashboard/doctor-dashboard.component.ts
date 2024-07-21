import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../layout/doctor-layout/components/sidebar/sidebar.component';
import { AuthService } from '../features/auth/services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{
  userName: string;

  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.userName = this.authService.getCurrentUserName();  }

}
