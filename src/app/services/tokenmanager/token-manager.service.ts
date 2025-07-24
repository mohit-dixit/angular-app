import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  isTokenExpired(): boolean {
    const expiryStr = sessionStorage.getItem('tokenExpiry');
    if (!expiryStr) return true;

    const expiry = new Date(expiryStr).getTime();
    const now = new Date().getTime();

    return now >= expiry;
  }

  clearToken(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('tokenExpiry');
  }
}
