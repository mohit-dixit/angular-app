import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  triggerhideOnMobileClickSignal = signal<number>(0);
  triggerlogOutClickSignal = signal<number>(0);
  triggerhamburgerClickSignal = signal<number>(0);

  constructor() {}

  hideOnMobileClick() {
    this.triggerhideOnMobileClickSignal.update(v => v + 1);
  }

  logOutClick() {
    this.triggerlogOutClickSignal.update(v => v + 1);
  }

  hamburgerClick(){
    this.triggerhamburgerClickSignal.update(v => v + 1);
  }
}
