import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest } from '../../../services/common/http-client.service';
import { CreateDoctor } from '../models/create-doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { ListDoctor } from '../models/list-doctor';
import { ApiResponse } from '../models/list-doctor-response';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClientService : HttpClientService){}

  create(doctor: CreateDoctor, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "Doctor"
    }, doctor)
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
  read(pageRequest: PageRequest): Observable<ApiResponse> {
    return this.httpClientService.getPaging<ApiResponse>({ controller: 'Doctor' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
        })
      );
  }
}
