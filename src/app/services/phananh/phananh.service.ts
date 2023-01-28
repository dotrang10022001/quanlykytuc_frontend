import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhanAnhService {

  baseUrl: string="http://65.108.79.164:7200/api/services/app/PhanAnh/";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaPhanAnh(pa: any){
    return this.httpClient.post<any>(this.baseUrl + "CreateOrUpdatePhanAnh", pa);
  }

  getDanhSachPhanAnh(){
    return this.httpClient.get<any>(this.baseUrl + "GetPhanAnh");
  }

  xoaPhanAnh(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "DeletePhanAnh?id=" + id);
  }

  getPhanAnhById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "GetPhanAnh?Id=" + id);
  }
}
