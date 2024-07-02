import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { CreateUserClaim } from '../models/create-user-operation-claim';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ListUserClaimsResponse } from '../models/list-user-claims-response';
import { UpdateUserClaim } from '../models/update-user-claim';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(private httpClientService : HttpClientService){}
  create(userClaim: CreateUserClaim, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService
      .post({ controller: "UserOperationClaim" }, userClaim)
      .subscribe({ next: result => {
          if (successCallBack) {
            successCallBack();
            console.log("res", result);
          }
        }, error: (errorResponse: HttpErrorResponse) => {
          if (errorCallBack) {
            errorCallBack(errorResponse.message);
          }
        } });
}
read(pageRequest: PageRequest): Observable<ListUserClaimsResponse> {
  return this.httpClientService.getPaging<ListUserClaimsResponse>({ controller: 'UserOperationClaim' }, pageRequest)
    .pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
        return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
      })
    );
}
updateUserClaim(userClaim: Partial<UpdateUserClaim>): Observable<UpdateUserClaim> {
  const requestParameter: Partial<RequestParameters> = {
    controller: 'UserOperationClaim'
  };
  console.log("testttt",userClaim)
  return this.httpClientService.put<UpdateUserClaim>(requestParameter, userClaim);
}
deleteuserClaim(userClaimId: number): Observable<void> {
  const requestParameters: Partial<RequestParameters> = {
    controller: 'UserOperationClaim'
  };
  console.log("fid", userClaimId)
  return this.httpClientService.delete<void>(requestParameters, userClaimId);
}
}
