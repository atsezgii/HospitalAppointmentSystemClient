import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentDataShareService {

  private departmentSource = new BehaviorSubject<any>(null);
  currentDepartment = this.departmentSource.asObservable();
  constructor() { }

  changeUser(department: any) {
    this.departmentSource.next(department);
    console.log("datachange",department)
  }

}
