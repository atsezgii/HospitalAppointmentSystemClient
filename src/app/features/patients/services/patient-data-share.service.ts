import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientDataShareService {

  private patientSource = new BehaviorSubject<any>(null);
  currentpatient = this.patientSource.asObservable();
  constructor() { }

  changePatient(patient: any) {
    this.patientSource.next(patient);
    console.log("datachange",patient)
  }

}
