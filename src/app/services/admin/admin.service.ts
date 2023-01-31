import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string=environment.server_api + "/Account";

  constructor(private httpClient: HttpClient) { }

  getDanhSachTaiKhoan(){
    return this.httpClient.get<any>(this.baseUrl + "/GetAllAccount");
  }

  xoaTaiKhoan(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteAccount?id=" + id);
  }

  taoTaiKhoan(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "/AdminCreateAccount", obj);
  }
  suaTaiKhoan(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "/AdminUpdateAccount", obj);
  }
  getThongTinCaNhan(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "/GetUserInformation", obj);
  }
}
