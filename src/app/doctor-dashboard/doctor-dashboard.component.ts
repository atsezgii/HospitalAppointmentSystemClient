import { Component } from '@angular/core';
import { SidebarComponent } from '../layout/doctor-layout/components/sidebar/sidebar.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {

}
