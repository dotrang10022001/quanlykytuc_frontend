import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DangKyPhong } from 'src/app/models/dangkyphong.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DangkyphongService {

  baseUrl: string=environment.server_api;

  constructor(private httpClient: HttpClient) { }

  svTaoHoacCapNhatDangKyPhong(dk: DangKyPhong){
    return this.httpClient.post<any>(this.baseUrl + 'SVDKP/CreateOrUpdateSVDKP', dk);
  }

  getDanhSachToa(){
    return this.httpClient.get<any>(this.baseUrl + 'Building/GetBuilding');
  }

  getDSDKTheoMSSV(masinhvien: any){
    return this.httpClient.get<any>(this.baseUrl + "AdminRoomRegistion/AdminGetForms?MaSinhVien=" + masinhvien);
  }

  getDSDKTheoMaToa(matoa: any){
    return this.httpClient.get<any>(this.baseUrl + "AdminRoomRegistion/AdminGetForms?MaToa=" + matoa);
  }

  getDonDangKyTheoId(id: number){
    return this.httpClient.get<any>(this.baseUrl + "AdminRoomRegistion/AdminGetForms?Id=" + id);
  }

  getDanhSachDangKy(){
    return this.httpClient.get<any>(this.baseUrl + "AdminRoomRegistion/AdminGetForms");
  }

  xoaDonDangKy(id: number){
    return this.httpClient.delete<any>(this.baseUrl + 'SVDKP/DeleteSVDKP?id=' + id);
  }

  chapNhanDK(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "AdminRoomRegistion/AdminAcceptAForm", obj);
  }

  tuchoiDK(obj: any){
    return this.httpClient.post<any>(this.baseUrl + "AdminRoomRegistion/AdminDenyForm", obj);
  }
}
