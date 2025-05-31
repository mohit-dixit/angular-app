import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(){
    const configFile = environment.production ? '/config.prod.json' : '/config.json'; // Choose file based on environment
    return this.http.get(configFile)
      .toPromise().then((config) => {
        this.config = config;
      });
  }

  getConfig() {
    return this.config;
  }
}
