import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuDungDichVu } from 'src/app/models/sudungdichvu.model';

@Injectable({
  providedIn: 'root'
})
export class SudungdichvuService {

  baseUrl: string="https://65.108.79.164:7201/api/services/app/SDDV/";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaSDDV(sddv: SuDungDichVu){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdateSDDV", sddv);
  }

  getDanhSachSDDV(loaiDoiTuong: number){
    return this.httpClient.get<any>(this.baseUrl + "GetSuDungDichVu?LoaiDoiTuong=" + loaiDoiTuong);
  }
  xoaSDDV(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteSDDV?id=" + id);
  }

  getSDDVById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetSuDungDichVu?Id=" + id);
  }

}
