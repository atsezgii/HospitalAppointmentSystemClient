import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { ListDepartmentResponse } from '../models/list-department-response';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ListDepartment } from '../models/list-department';
import { CreateDepartment } from '../models/create-department';
import { UpdateDepartment } from '../models/update-department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService : HttpClientService){}

  create(department: CreateDepartment, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "Department"
    }, department)
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

  read(pageRequest: PageRequest): Observable<ListDepartmentResponse> {
    return this.httpClientService.getPaging<ListDepartmentResponse>({ controller: 'Department' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
        })
      );
  }

  updateDepartment(department: Partial<UpdateDepartment>): Observable<UpdateDepartment> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'Department'
    };
    console.log("testttt",department)
    return this.httpClientService.put<UpdateDepartment>(requestParameter, department);
  }
  deleteDepartment(departmentId: number): Observable<void> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'Department'
    };
    return this.httpClientService.delete<void>(requestParameters, departmentId);
  }
}
