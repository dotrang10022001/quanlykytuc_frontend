import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuDungDichVu } from 'src/app/models/sudungdichvu.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SudungdichvuService {

  baseUrl: string=environment.server_api + "/SDDV";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaSDDV(sddv: SuDungDichVu){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdateSDDV", sddv);
  }

  getDanhSachSDDV(loaiDoiTuong: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetSuDungDichVu?LoaiDoiTuong=" + loaiDoiTuong);
  }
  xoaSDDV(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteSDDV?id=" + id);
  }

  getSDDVById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetSuDungDichVu?Id=" + id);
  }

}
