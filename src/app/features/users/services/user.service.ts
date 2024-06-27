import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserListApiResponse } from '../models/list-user-response';
import { UpdateUser } from '../models/update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService){}
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
    return this.httpClientService.put<UpdateUser>(requestParameter, user);
  }

}
