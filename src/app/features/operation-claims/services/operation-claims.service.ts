import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest, RequestParameters } from '../../../services/common/http-client.service';
import { ListOperationClaimsResponse } from '../models/list-operation-claims-response';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateOperationClaim } from '../models/crate-operation-claim';
import { UpdateOperationClaim } from '../models/update-operation-claim';

@Injectable({
  providedIn: 'root'
})
export class OperationClaimsService {

  constructor(private httpClientService : HttpClientService){}

  read(pageRequest: PageRequest): Observable<ListOperationClaimsResponse> {
    return this.httpClientService.getPaging<ListOperationClaimsResponse>({ controller: 'OperationClaim' }, pageRequest)
      .pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          const errorMessage = (errorResponse && errorResponse.message) ? errorResponse.message : 'Unknown error';
          return throwError(() => new Error(errorMessage)); // throwError fonksiyonunu kullanarak hata fırlatma
        })
      );
  }
  create(operationClaim: CreateOperationClaim, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
        controller: "OperationClaim"
    }, operationClaim)
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
updateoperationClaim(operationClaim: Partial<UpdateOperationClaim>): Observable<UpdateOperationClaim> {
  const requestParameter: Partial<RequestParameters> = {
    controller: 'OperationClaim'
  };
  console.log("testttt",operationClaim)
  return this.httpClientService.put<UpdateOperationClaim>(requestParameter, operationClaim);
}
deleteoperationClaim(operationClaimId: number): Observable<void> {
  const requestParameters: Partial<RequestParameters> = {
    controller: 'OperationClaim'
  };
  console.log("fid", operationClaimId)
  return this.httpClientService.delete<void>(requestParameters, operationClaimId);
}
}
