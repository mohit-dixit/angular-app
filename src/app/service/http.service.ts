import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  context = environment.context;

  constructor(private http:HttpClient) { }

  savedata(api : string, str : string){
    const apiUrl = this.context + api;
    let params = new HttpParams();
    params = params.set('name', str);
    return this.http.post(apiUrl, null, { params: params });
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
}
