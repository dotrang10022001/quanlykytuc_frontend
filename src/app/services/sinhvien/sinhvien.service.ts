import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SinhVien } from 'src/app/models/sinhvien.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SinhvienService {

  baseUrl: string=environment.server_api + "/Student";
  constructor(private httpClient: HttpClient) { }

  themHoacSuaSinhVien(sv: SinhVien){
    return this.httpClient.post<any>(this.baseUrl + "/CreateOrUpdateStudent", sv);
  }

  getDanhSachSinhVien(){
    return this.httpClient.get<any>(this.baseUrl + "/GetStudent");
  }
  xoaSinhVien(id: number){
    return this.httpClient.delete<any>(this.baseUrl + "/DeleteStudent?id=" + id);
  }

  getSinhVienById(id: number){
    return this.httpClient.get<any>(this.baseUrl + "/GetStudent?Id=" + id);
  }

}
