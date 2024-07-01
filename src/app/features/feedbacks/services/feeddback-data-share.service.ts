import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeddbackDataShareService {

  private feedbackSource = new BehaviorSubject<any>(null);
  currentFeedback = this.feedbackSource.asObservable();
  constructor() { }

  changeFeedback(feedback: any) {
    this.feedbackSource.next(feedback);
    console.log("datachange",feedback)
  }


}
