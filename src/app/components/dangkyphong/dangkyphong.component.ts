import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dangkyphong',
  templateUrl: './dangkyphong.component.html',
  styleUrls: ['./dangkyphong.component.css']
})
export class DangkyphongComponent {
  role: string="guest";
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=14;
  thongbao: any={
    nhaXepO: 'B3, B6, B9. Riêng sinh viên diện chính sách ưu tiên xếp nhà B3.', thoiGianDangKy: "10/08-20/08/2022", thoiGianO:"Tính từ ngày 01/09/2019 đến ngày 31/01/2020 (5 tháng). Trong trường hợp sinh viên chưa có chỗ ở khi nhập học, Trung tâm QL KTX vẫn tạo điều kiện cho sinh viên được ở từ 10/08/2019.",
    doiTuongXepO: 'K66, K67', doiTuongUuTien: 'Sinh viên diện chính sách (con thương binh, liệt sỹ, bệnh binh, chất độc hóa học, vùng sâu vùng xa, biên giới, hải đảo, dân tộc….); Nữ sinh. ;Sinh viên có hoàn cảnh khó khăn. ;Sinh viên ngoại tỉnh.',
    khoanThuLePhi: 'Trang bị ban đầu: Thu 1 lần đầu năm Tiền ở và tiền nước sinh hoạt: Thu 5 tháng/SV Tiền điện sinh viên đóng theo công tơ sử dụng hàng tháng sẽ thông báo về các phòng.',
    dangKyTrucTiep: 'Đăng ký trực tiếp và đóng lệ phí tại P101- B9- Trung tâm QL KTX',
    luuY: 'Sinh viên sau khi đăng ký online cần kiểm tra email nếu được chấp nhận ở.'
  }

  dsDangKyCanBo: any=[];
  dsDangKySinhVien: any=[];
  constructor (){
    if(localStorage.getItem('role')){
      let data = localStorage.getItem('role');
      if(data != null) this.role = data.toString();
    }
  }
  ngOnInit(){
    
  }
}
