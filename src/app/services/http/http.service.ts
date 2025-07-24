import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigService } from '../app-config.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private context: any;

  constructor(private http:HttpClient, private configService: AppConfigService) { 
    this.context = this.configService.getConfig().context;
  }

  savedata(api : string, saveobject : any){    
    const apiUrl = this.context + api;
    return this.http.post(apiUrl, null, { params: saveobject });
  }

  updatedata(api : string, updateobject : any){
    const apiUrl = this.context + api;
    return this.http.put(apiUrl+"/"+updateobject.id, updateobject);
  }

  deletedata(api : string, id : number){
    const apiUrl = this.context + api;
    return this.http.delete(apiUrl+"/"+id);
  }

  getalldata(api : string){
    const apiUrl = this.context + api;
    return this.http.get(apiUrl);
  }

  getdatabyid(api : string, id : number){
    const apiUrl = this.context + api;
    return this.http.get(apiUrl+"/"+id);
  }

  login(api : string, loginobject : any){
    const apiUrl = this.context + api;
    return this.http.post(apiUrl, loginobject);
  }

  logout(api: string) {
    const apiUrl = this.context + api;
    return this.http.post(apiUrl,null);
  }
}
