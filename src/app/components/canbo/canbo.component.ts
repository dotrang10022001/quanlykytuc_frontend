import { Component, ViewChild } from '@angular/core';
import { CanboService } from 'src/app/services/canbo/canbo.service';

@Component({
  selector: 'app-canbo',
  templateUrl: './canbo.component.html',
  styleUrls: ['./canbo.component.css']
})
export class CanboComponent {

  //cán bộ: mã cán bộ, họ tên, giới tính, ngày sinh, ảnh, chức vụ, email, số điện thoại, tòa
  //cán bộ và sinh viên chỉ có chức năng xem
  //quản trị viên có chức năng thêm, xóa, sửa, xem thông tin cán bộ
  dsCanBo: any=[
    {macanbo:'CB001', hoten: 'Nguyễn Thị An', anh:'canbo1.jpg', chucvu:'Quản lý', email: 'linlin@gmail.com', toa: 'B3'},
    {macanbo:'CB002', hoten: 'Trần Văn Tuấn', anh:'canbo2.jpg', chucvu:'Phó quản lý', email: 'maing@gmail.com', toa: 'B9'},
    {macanbo:'CB003', hoten: 'Cao Văn Toàn', anh:'canbo3.jpg', chucvu:'Quản lý', email: 'daki@gmail.com', toa:'B10'},
    {macanbo:'CB004', hoten: 'Đỗ Đặng Linh', anh:'canbo4.jpg', chucvu:'Quản lý', email: 'hungn@gmail.com', toa: 'B3'},
    {macanbo:'CB005', hoten: 'Nguyễn Minh Liên', anh:'canbo5.jpg', chucvu:'Quản lý', email: 'admin@gmail.com', toa: 'B6'},
    {macanbo:'CB006', hoten: 'Tạ Linh Đan', anh:'canbo6.jpg', chucvu:'Quản lý', email: 'hello@gmail.com', toa: 'B7'},
    {macanbo:'CB007', hoten: 'Trần Thị Tuyết', anh:'canbo7.jpg', chucvu:'Quản lý', email: 'hiworld@gmail.com', toa: 'B5'},
    {macanbo:'CB008', hoten: 'Hồ Văn Thế', anh:'canbo8.jpg', chucvu:'Quản lý', email: 'abcd@gmail.com', toa: 'B8'},
    {macanbo:'CB009', hoten: 'Lại Văn Tam', anh:'canbo9.jpg', chucvu:'Quản lý', email: 'myname@gmail.com', toa: 'B6'},
  ]
  
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=5;
  total: any;

  constructor(private canboService: CanboService){
    /*
    this.canboService.getDsCanBo().subscribe(data: any)=>{
      this.dsCanBo = data;
      this.totalCanBo = data.length;
    }
    */
   this.total = this.dsCanBo.length;
  }

}
