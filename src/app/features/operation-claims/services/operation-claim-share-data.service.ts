import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimShareDataService {
  private operationClaimSource = new BehaviorSubject<any>(null);
  currentoperationClaim = this.operationClaimSource.asObservable();
  constructor() { }

  changeOperationClaim(operationClaim: any) {
    this.operationClaimSource.next(operationClaim);
    console.log("datachange",operationClaim)
  }


}
