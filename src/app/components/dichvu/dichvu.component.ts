import { Component } from '@angular/core';

@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.css']
})
export class DichvuComponent {

  //dịch vụ: tên dịch vụ, đơn vị tính, đơn giá, mô tả, ảnh, ghi chú
  
  dsDichVu: any=[
    {tendichvu: 'Giặt là', donvitinh: 'Kg', dongia: '3600', mota: 'Đây là dịch vụ mới chuyên nhận giặt, là, sấy khô quần áo, chăn bông, gấu bông,...', anh: "dichvu1.jpg" , ghichu: "hiện chỉ có tại tòa B3"},
    {tendichvu: 'Trông giữ xe', donvitinh: 'Ngày', dongia: '2000', mota: 'Ban quản lý ký túc xá chuyên nghiệp, giữ gìn an ninh trật tự và nề nếp tại khu ký túc xá. Có hệ thống camera giám sát đảm bảo an ninh, không có kẻ xấu trà trộn vào.', anh: "dichvu2.jpg" , ghichu: "có tại tất cả tòa nhà"},
    {tendichvu: 'Trông giữ xe', donvitinh: 'Ngày', dongia: '2000', mota: 'Ban quản lý ký túc xá chuyên nghiệp, giữ gìn an ninh trật tự và nề nếp tại khu ký túc xá. Có hệ thống camera giám sát đảm bảo an ninh, không có kẻ xấu trà trộn vào.', anh: "dichvu2.jpg" , ghichu: "có tại tất cả tòa nhà"},
    {tendichvu: 'Trông giữ xe', donvitinh: 'Ngày', dongia: '2000', mota: 'Ban quản lý ký túc xá chuyên nghiệp, giữ gìn an ninh trật tự và nề nếp tại khu ký túc xá. Có hệ thống camera giám sát đảm bảo an ninh, không có kẻ xấu trà trộn vào.', anh: "dichvu2.jpg" , ghichu: "có tại tất cả tòa nhà"},
    {tendichvu: 'Trông giữ xe', donvitinh: 'Ngày', dongia: '2000', mota: 'Ban quản lý ký túc xá chuyên nghiệp, giữ gìn an ninh trật tự và nề nếp tại khu ký túc xá. Có hệ thống camera giám sát đảm bảo an ninh, không có kẻ xấu trà trộn vào.', anh: "dichvu2.jpg" , ghichu: "có tại tất cả tòa nhà"},
  ]
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=4;
  total: any;
  constructor (){
    this.total = this.dsDichVu.length;
  }

}
