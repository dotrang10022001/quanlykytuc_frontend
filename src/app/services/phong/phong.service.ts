import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phong } from 'src/app/models/phong.model';

@Injectable({
  providedIn: 'root'
})
export class PhongService {

  baseUrl: string="https://65.108.79.164:7201/api/services/app/Room/";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaPhong(p: Phong){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateRoom", p);
  }

  getDanhSachPhong(){
    return this.httpClient.get<any>(this.baseUrl + "GetRoom");
  }

  getDSPTheoMaToa(maToa: any){
    return this.httpClient.get<any>(this.baseUrl + "GetRoom?MaToa=" + maToa);
  }
  xoaPhong(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteRoom?id=" + id);
  }

  getPhongById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetRoom?Id=" + id);
  }
}
