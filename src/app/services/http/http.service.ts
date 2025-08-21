import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private context: any;

  constructor(private _http: HttpClient,
    private _configService: AppConfigService
  ) {
    this.context = this._configService.getConfig().context;
  }

  savedata(api: string, saveobject: any) {
    const apiUrl = this.context + api;
    return this._http.post(apiUrl, saveobject);
  }

  updatedata(api: string, updateobject: any) {
    const apiUrl = this.context + api;
    return this._http.put(apiUrl + "/" + updateobject.id, updateobject);
  }

  deletedata(api: string, id: number) {
    const apiUrl = this.context + api;
    return this._http.delete(apiUrl + "/" + id);
  }

  getalldata(api: string) {
    const apiUrl = this.context + api;
    return this._http.get(apiUrl);
  }

  getdatabyid(api: string, id: number) {
    const apiUrl = this.context + api;
    return this._http.get(apiUrl + "/" + id);
  }

  login(api: string, loginobject: any) {
    const apiUrl = this.context + api;
    return this._http.post(apiUrl, loginobject);
  }

  logout(api: string) {
    const apiUrl = this.context + api;
    return this._http.post(apiUrl, null);
  }

  getChatResponse(api: string, prompt: string): Observable<{ response: string }> {
    const apiUrl = this.context + api;
    return this._http.post<{ response: string }>(apiUrl, { prompt });
  }

  istokenexpired(api: string): Observable<boolean> {
    const apiUrl = this.context + api;
    return this._http.get<boolean>(apiUrl);
  }

  getTimeout(api: string): Observable<bigint> {
    const apiUrl = this.context + api;
    return this._http.get<bigint>(apiUrl);
  }
}
