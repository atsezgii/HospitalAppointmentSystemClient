import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../../services/common/http-client.service';
import { CreateDoctorSchedule } from '../models/add-doctor-schedule';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  constructor(private httpClientService : HttpClientService){}

  create(doctorSchedule: CreateDoctorSchedule, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "DoctorAvailability"
    }, doctorSchedule)
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
