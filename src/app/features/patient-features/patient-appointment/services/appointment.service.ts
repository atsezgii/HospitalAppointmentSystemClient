import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest } from '../../../../services/common/http-client.service';
import { CreateAppointment } from '../models/create-appointment';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../doctors/models/list-doctor-response';
import { AppointmentResponse } from '../models/list-appointment-response';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClientService : HttpClientService){}

  create(appointment: CreateAppointment, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "Appointment"
    }, appointment)
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

getByPatient(patientId: number,pageRequest: PageRequest): Observable<AppointmentResponse> {
  return this.httpClientService.getByPatient<AppointmentResponse>({ controller: 'Appointment',action:'by-patient' }, pageRequest,patientId)
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
        return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
      })
    );
}
read(pageRequest: PageRequest): Observable<AppointmentResponse> {
  return this.httpClientService.getPaging<AppointmentResponse>({ controller: 'Appointment' }, pageRequest)
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
        return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
      })
    );
}

}
