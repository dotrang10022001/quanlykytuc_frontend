import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phong } from 'src/app/models/phong.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhongService {

  baseUrl: string=environment.server_api + "/Room";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaPhong(p: Phong){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdateRoom", p);
  }

  getDanhSachPhong(){
    return this.httpClient.get<any>(this.baseUrl + "/GetRoom");
  }

  getDSPTheoMaToa(maToa: any){
    return this.httpClient.get<any>(this.baseUrl + "/GetRoom?MaToa=" + maToa);
  }
  xoaPhong(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteRoom?id=" + id);
  }

  getPhongById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetRoom?Id=" + id);
  }
}
