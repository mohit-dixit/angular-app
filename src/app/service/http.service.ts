import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  context = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  savedata(str : string){
    const apiUrl = this.context + "departments";
    let params = new HttpParams();
    params = params.set('name', str);
    return this.http.post(apiUrl, null, { params: params });
  }

  updatedata(updateobject : any){
    const apiUrl = this.context + "departments";
    return this.http.put(apiUrl+"/"+updateobject.id, updateobject);
  }

  deletedata(id : number){
    const apiUrl = this.context + "departments";
    return this.http.delete(apiUrl+"/"+id);
  }

  getalldata(){
    const apiUrl = this.context + "departments";
    return this.http.get(apiUrl);
  }
}
