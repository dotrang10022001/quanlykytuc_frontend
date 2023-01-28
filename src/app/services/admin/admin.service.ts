import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string="https://65.108.79.164:7201/api/services/app/Account/";

  constructor(private httpClient: HttpClient) { }

  getDanhSachTaiKhoan(){
    return this.httpClient.get<any>(this.baseUrl + "GetAllAccount");
  }

  xoaTaiKhoan(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeleteAccount?id=" + id);
  }

  getThongTinCaNhan(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "GetUserInformation", obj);
  }
}
