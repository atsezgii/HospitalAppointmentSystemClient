import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorDataShareService {


  private doctorSource = new BehaviorSubject<any>(null);
  currentDoctor = this.doctorSource.asObservable();
  constructor() { }

  changeDoctor(doctor: any) {
    this.doctorSource.next(doctor);
    console.log("datachange",doctor)
  }
}
