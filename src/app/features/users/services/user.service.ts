import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserListApiResponse } from '../models/list-user-response';
import { UpdateUser } from '../models/update-user';
import { CreateUser } from '../models/add-user';
import { ListUser } from '../models/list-user';
import { ListPatient } from '../../patients/models/list-patient';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService : HttpClientService){}

  create(user: CreateUser, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "User"
    }, user)
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
  read(pageRequest: PageRequest): Observable<UserListApiResponse> {
    return this.httpClientService.getPaging<UserListApiResponse>({ controller: 'User' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  updateUser(user: Partial<UpdateUser>): Observable<UpdateUser> {
    const requestParameter: Partial<RequestParameters> = {
      controller: 'User',
    };
    console.log("testttt",user)
    return this.httpClientService.put<UpdateUser>(requestParameter, user);
  }
  deleteUser(userId: number): Observable<void> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'User'
    };
    console.log("userid from service", userId)
    return this.httpClientService.delete<void>(requestParameters, userId);
  }

  getUser(id: number): Observable<ListUser> {
    const requestParameters: Partial<RequestParameters> = {
      controller: 'User',
    };
    return this.httpClientService.get<ListUser>(requestParameters, id)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = errorResponse && errorResponse.message ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage));
        })
      );
  }


}
