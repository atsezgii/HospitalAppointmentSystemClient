import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListComponent } from '../../features/doctors/components/list/list.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule,
    ListComponent
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {

}
