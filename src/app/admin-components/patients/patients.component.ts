import { Component } from '@angular/core';
import { ListPatientComponent } from '../../features/patients/components/list-patient/list-patient.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [ListPatientComponent],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

}
