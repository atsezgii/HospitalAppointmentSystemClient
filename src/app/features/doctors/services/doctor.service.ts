import { Injectable } from '@angular/core';
import { HttpClientService, PageRequest } from '../../../services/common/http-client.service';
import { CreateDoctor } from '../models/create-doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { ListDoctor } from '../models/list-doctor';
import { ApiResponse } from '../models/list-doctor-response';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClientService : HttpClientService){}


  create(doctor:CreateDoctor, successCallBack?: () => void, errorCallBack?: (errorMessage : string) => void){
    this.httpClientService.post({
      controller:"Doctor"
    },doctor)
    .subscribe(result => {
      successCallBack();
    },(errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
  }

  async read(pageRequest: PageRequest, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ApiResponse> {
    try {
      const response: ApiResponse = await this.httpClientService.getPaging<ApiResponse>({ controller: 'Doctor' }, pageRequest).toPromise();
      if (successCallBack) successCallBack();
      return response;
    } catch (errorResponse) {
      if (errorCallBack) errorCallBack((errorResponse as HttpErrorResponse).message);
      return { items: [], count: 0, index: 0, size:0, pages:0, hasNext: false, hasPrevious:false};
    }
  }
}
