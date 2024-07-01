import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ListFeedbackResponse } from '../models/list-feedback-response';
import { UpdateFeedback } from '../models/update-feedback';
import { CreateFeedback } from '../models/create-feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClientService : HttpClientService){}
  create(feedback: CreateFeedback, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "FeedBack"
    }, feedback)
    .subscribe({
        next: (result) => {
            if (successCallBack) {
                successCallBack();
                console.log("res", result)
            }
        },
        error: (errorResponse: HttpErrorResponse) => {
            if (errorCallBack) {
                errorCallBack(errorResponse.message);
            }
        }
    });
}
  read(pageRequest: PageRequest): Observable<ListFeedbackResponse> {
    return this.httpClientService.getPaging<ListFeedbackResponse>({ controller: 'FeedBack' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
        })
      );
  }
  updateFeedback(feedback: Partial<UpdateFeedback>): Observable<UpdateFeedback> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'FeedBack'
    };
    console.log("testttt",feedback)
    return this.httpClientService.put<UpdateFeedback>(requestParameter, feedback);
  }
  deletefeedback(feedbackId: number): Observable<void> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'FeedBack'
    };
    console.log("fid", feedbackId)
    return this.httpClientService.delete<void>(requestParameters, feedbackId);
  }
}
