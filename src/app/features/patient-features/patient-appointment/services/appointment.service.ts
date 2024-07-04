import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/common/http-client.service';
import { CreateAppointment } from '../models/create-appointment';
import { HttpErrorResponse } from '@angular/common/http';

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

}
