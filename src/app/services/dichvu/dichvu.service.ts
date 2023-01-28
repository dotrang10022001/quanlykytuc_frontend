import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DichVu } from 'src/app/models/dichvu.model';

@Injectable({
  providedIn: 'root'
})
export class DichvuService {

  baseUrl: string="https://65.108.79.164:7201/api/services/app/LoaiDichVu/";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaLoaiDichVu(dv: DichVu){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateLoaiDichVu", dv);
  }

  getDanhSachLoaiDichVu(){
    return this.httpClient.get<any>(this.baseUrl + "GetLoaiDichVu");
  }
  xoaLoaiDichVu(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteLoaiDichVu?id=" + id);
  }

  getLoaiDichVuById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetLoaiDichVu?Id=" + id);
  }

}
