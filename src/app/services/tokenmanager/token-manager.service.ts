import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from '../../environments/environment';
import { EncryptionService } from '../encryption/encryption.service';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {

  constructor(private _httpservice: HttpService,
    private _encryptionService: EncryptionService
  ) { }

  isUserLoggedIn(): boolean {
    return !!this.getLoginUserName();
  }

  removeLoginUserName(): void {
    localStorage.removeItem('loginUsername');
  }

  setLoginUserName(username: string): void {
    const encrypted = this._encryptionService.encrypt(username);
    localStorage.setItem('loginUsername', encrypted);
  }

  getLoginUserName(): string | null {
    const encrypted = localStorage.getItem('loginUsername');
    if (encrypted) {
      return this._encryptionService.decrypt(encrypted);
    }
    return null;
  }

  checkIfTokenexpired(): Observable<boolean> {
    const api = environment.apis.isTokenExpired;
    return this._httpservice.istokenexpired(api).pipe(
      catchError(() => of(true)) // default to expired if error
    );
  }

  getTimeout(): Observable<bigint> {
    const api = environment.apis.getTimeout;
    return this._httpservice.getTimeout(api).pipe(
      catchError(() => of(BigInt(0))) // default to 0 if error
    );
  }  
}
