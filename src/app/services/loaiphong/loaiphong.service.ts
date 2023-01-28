import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaiPhong } from 'src/app/models/loaiphong.model';

@Injectable({
  providedIn: 'root'
})
export class LoaiPhongService {

  baseUrl: string="http://65.108.79.164:7200/api/services/app/LoaiPhong/";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaLoaiPhong(lp: LoaiPhong){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateLoaiPhong", lp);
  }

  getDanhSachLoaiPhong(){
    return this.httpClient.get<any>(this.baseUrl + "GetLoaiPhong");
  }

  getDSLPTheoMaToa(maToa: any){
    return this.httpClient.get<any>(this.baseUrl + "GetLoaiPhong?MaToa=" + maToa);
  }
  xoaLoaiPhong(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteLoaiPhong?id=" + id);
  }

  getLoaiPhongById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetLoaiPhong?Id=" + id);
  }
}
