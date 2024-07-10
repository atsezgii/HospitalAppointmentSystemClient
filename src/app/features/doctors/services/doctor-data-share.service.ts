import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorDataShareService {
  private doctorSource = new BehaviorSubject<any>(null);
  private combinedDoctorDataSource = new BehaviorSubject<any[]>([]);


  currentDoctor = this.doctorSource.asObservable();
  currentCombinedDoctorData = this.combinedDoctorDataSource.asObservable();
  constructor() { }

  changeDoctor(doctor: any) {
    this.doctorSource.next(doctor);
    console.log("datachange",doctor)
  }
  changeCombinedDoctorData(data: any[]) {
    this.combinedDoctorDataSource.next(data);
    console.log("Combined doctor data changed:", data);  }
}
