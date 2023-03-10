import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaiPhong } from 'src/app/models/loaiphong.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaiPhongService {

  baseUrl: string=environment.server_api + "/LoaiPhong";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaLoaiPhong(lp: LoaiPhong){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdateLoaiPhong", lp);
  }

  getDanhSachLoaiPhong(){
    return this.httpClient.get<any>(this.baseUrl + "/GetLoaiPhong");
  }

  getDSLPTheoMaToa(maToa: any){
    return this.httpClient.get<any>(this.baseUrl + "/GetLoaiPhong?MaToa=" + maToa);
  }
  xoaLoaiPhong(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteLoaiPhong?id=" + id);
  }

  getLoaiPhongById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetLoaiPhong?Id=" + id);
  }
}
