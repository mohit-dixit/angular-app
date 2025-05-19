import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(){
    return this.http.get('/config.json')
      .toPromise().then((config) => {
        this.config = config;
      });
  }

  getConfig() {
    return this.config;
  }
}
