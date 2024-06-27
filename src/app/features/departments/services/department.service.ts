import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest } from '../../../services/common/http-client.service';
import { ListDepartmentResponse } from '../models/list-department-response';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ListDepartment } from '../models/list-department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService : HttpClientService){}

 //getting all datas without pagination
  // readforSelectOption(): Observable<ListDepartment[]> {
  //   return this.httpClientService.get<ListDepartment[]>({ controller: 'Department' })
  //     .pipe(
  //       catchError((errorResponse: HttpErrorResponse) => {
  //         const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
  //         return throwError(() => new Error(errorMessage));
  //       })
  //     );
  // }

  read(pageRequest: PageRequest): Observable<ListDepartmentResponse> {
    return this.httpClientService.getPaging<ListDepartmentResponse>({ controller: 'Department' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
        })
      );
  }
}
