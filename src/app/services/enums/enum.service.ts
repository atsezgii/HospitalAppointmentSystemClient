import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
  private apiUrl = 'https://localhost:7144/api/Enum';
  constructor(private http: HttpClient) { }

  getEnumValues(enumType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${enumType}`);
  }

}
