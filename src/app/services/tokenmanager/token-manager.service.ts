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
    sessionStorage.removeItem('loginUsername');
  }

  setToken(token: string, expiry: Date, username: string): void {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('tokenExpiry', expiry.toISOString());
    sessionStorage.setItem('loginUsername', username);
  }

  getLoginUserName(): string | null {
    return sessionStorage.getItem('loginUsername');
  }

  getTokenExpiry(): string | null {
    return sessionStorage.getItem('tokenExpiry');
  }
}
