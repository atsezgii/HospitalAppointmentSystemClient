import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtHelperService {
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (Error) {
      return null;
    }
  }

  getUserId(token: string): string | null { //dep kullanıldı
    const decodedToken = this.decodeToken(token);
    console.log("dec",decodedToken)

    return decodedToken ? decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;
  }
  getUserName(token: string): string | null { //dep kullanıldı
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] : null;
  }
  isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return true; // Token decode edilemediyse veya exp alanı yoksa, token süresi dolmuş kabul edilir
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate < new Date(); // exp ile şu anki zaman karşılaştırılır
  }
  getUserData(token: string): string | null { //for user typee
    const decodedToken = this.decodeToken(token);
    console.log("userdata", decodedToken ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"] : null)
    return decodedToken ? decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"] : null;
  }
  getTokenExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return null;
    }

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate;
  }
}
