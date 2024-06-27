import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataShareService {

  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: any) {
    console.log("dfsdgfsdf",user)
    this.userSource.next(user);
  }

}
