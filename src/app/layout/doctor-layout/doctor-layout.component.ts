import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-layout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule],
  templateUrl: './doctor-layout.component.html',
  styleUrl: './doctor-layout.component.scss'
})
export class DoctorLayoutComponent {

}
