import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { CreatePatient } from '../models/create-patient';
import { HttpErrorResponse } from '@angular/common/http';
import { ListPatientResponse } from '../models/list-patient-response';
import { Observable, catchError, throwError } from 'rxjs';
import { UpdatePatient } from '../models/update-patient';
import { ListPatient } from '../models/list-patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClientService : HttpClientService){}
  create(patient: CreatePatient, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "Patient"
    }, patient)
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
  read(pageRequest: PageRequest): Observable<ListPatientResponse> {
    return this.httpClientService.getPaging<ListPatientResponse>({ controller: 'Patient' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  updatePatient(patient: Partial<UpdatePatient>): Observable<UpdatePatient> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'Patient'
    };
    console.log("testttt",patient)
    return this.httpClientService.put<UpdatePatient>(requestParameter, patient);
  }
  deletePatient(patientId: number): Observable<void> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'Patient'
    };
    return this.httpClientService.delete<void>(requestParameters, patientId);
  }
  getAllPatients(): Observable<ListPatientResponse> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'Patient',
    };
    return this.httpClientService.get<ListPatientResponse>(requestParameters)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = errorResponse && errorResponse.message ? errorResponse.message : 'Bilinmeyen hata';
          return throwError(() => new Error(errorMessage));
        })
      );
  }

}
