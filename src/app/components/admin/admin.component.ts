import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  //tài khoản: tên đăng nhập, mật khẩu, vai trò, mã người dùng
  dsTaiKhoan: any=[
    {tendangnhap: 'admin', matkhau: '123456', vaitro: "Quản trị viên", manguoidung: 'CB001.123'},
    {tendangnhap: 'trangdo', matkhau: '123456789', vaitro: "Sinh viên", manguoidung: '20194188'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
    {tendangnhap: 'hello', matkhau: '156899', vaitro: "Cán bộ", manguoidung: 'CB002.122'},
  ]
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=12;
  total: any;
  themTaiKhoan(){
    
  }
  constructor (){
    this.total = this.dsTaiKhoan.length;
  }
}
