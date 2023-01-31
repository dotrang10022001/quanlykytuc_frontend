import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Canbo } from 'src/app/models/canbo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanboService {

  baseUrl: string=environment.server_api + "/Canbo";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaCanBo(cb: Canbo){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdateCanbo", cb);
  }

  getDanhSachCanBo(){
    return this.httpClient.get<any>(this.baseUrl + "/GetCanBo");
  }
  xoaCanBo(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteCanBo?id=" + id);
  }

  getCanBoById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetCanBo?Id=" + id);
  }

}
