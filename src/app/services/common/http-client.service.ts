import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  // baseUrl : main.ts de tanımlandı

  constructor(private httpClient:HttpClient, @Inject("baseUrl") private baseUrl:string) { }

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
  }
  get<T>(requsetParameters:Partial<RequestParameters>, id?: number) : Observable<T>{
    let url : string = "";
    if(requsetParameters.fullEndPoint)
      url = requsetParameters.fullEndPoint
    else
      url = `${this.url(requsetParameters)}${id ? `/${id}` : ""}`
    return this.httpClient.get<T>(url, {headers: requsetParameters.headers})
  }

  getPaging<T>(requestParameters: Partial<RequestParameters>, pageRequest?: PageRequest): Observable<T> {
    let url: string = "";
    if (requestParameters.fullEndPoint)
      url = requestParameters.fullEndPoint;
    else
    url = `${this.url(requestParameters)}?PageRequest.Page=${pageRequest.page}&PageRequest.PageSize=${pageRequest.size}`;
      let params = new HttpParams();
      if (pageRequest) {
        params = params
          .set('PageRequest.Page', pageRequest.page.toString() || '0')
          .set('PageRequest.PageSize', pageRequest.size.toString() || '10');
      }

      return this.httpClient.get<T>(url, { headers: requestParameters.headers, params });
    }


  post<T>(requestParameter:Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url= requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`

    return this.httpClient.post<T>(url,body,{headers:requestParameter.headers})
  }

  put<T>(requestParameter:Partial<RequestParameters>, body:Partial<T>) : Observable<T>{
    let url : string = "";
    if(requestParameter.fullEndPoint)
      url= requestParameter.fullEndPoint;
    else
      url = `${this.url(requestParameter)}`

    return this.httpClient.put<T>(url,body,{headers:requestParameter.headers})
  }

  delete<T>(requsetParameters:Partial<RequestParameters>, id: number):Observable<T>{
    let url : string = "";
    if(requsetParameters.fullEndPoint)
      url= requsetParameters.fullEndPoint;
    else
      url = `${this.url(requsetParameters)}/soft-delete/${id}`

    return this.httpClient.delete<T>(url,{headers:requsetParameters.headers})
  }

}
export class RequestParameters{
controller?:string;
action?:string;

headers?:HttpHeaders
baseUrl?:string; //uygulamada olmayan farklı basseUrl ex: jsonplaceholder/posts
fullEndPoint?:string;
}
export class PageRequest {
  page: number;
  size: number;
}
