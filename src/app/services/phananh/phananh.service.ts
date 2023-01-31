import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PhanAnhService {

  baseUrl: string=environment.server_api + "/PhanAnh";

  constructor(private httpClient: HttpClient) { }

  themHoacSuaPhanAnh(pa: any){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdatePhanAnh", pa);
  }

  getDanhSachPhanAnh(){
    return this.httpClient.get<any>(this.baseUrl + "/GetPhanAnh");
  }

  xoaPhanAnh(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeletePhanAnh?id=" + id);
  }

  getPhanAnhById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetPhanAnh?Id=" + id);
  }
}
