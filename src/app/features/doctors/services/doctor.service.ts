import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { CreateDoctor } from '../models/create-doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { ListDoctor } from '../models/list-doctor';
import { ApiResponse } from '../models/list-doctor-response';
import { Observable, catchError, throwError } from 'rxjs';
import { UpdateDoctor } from '../models/update-doctor';

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

  updateDoctor(doctor: Partial<UpdateDoctor>): Observable<UpdateDoctor> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'Doctor'
    };
    console.log("testttt",doctor)
    return this.httpClientService.put<UpdateDoctor>(requestParameter, doctor);
  }
  deleteDoctor(doctorId: number): Observable<void> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'Doctor'
    };
    return this.httpClientService.delete<void>(requestParameters, doctorId);
  }
}
