import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DangkyphongDialogComponent } from 'src/app/dialogs/dangkyphong-dialog/dangkyphong-dialog.component';
import { DangkyphongService } from 'src/app/services/dangkyphong/dangkyphong.service';
import Swal from 'sweetalert2';
import { DangKyPhong } from 'src/app/models/dangkyphong.model';

@Component({
  selector: 'app-dangkyphong',
  templateUrl: './dangkyphong.component.html',
  styleUrls: ['./dangkyphong.component.css']
})
export class DangkyphongComponent {
  public loading = false;
  role: string="guest";
  thongbao: any={
    nhaXepO: 'B3, B6, B9. Riêng sinh viên diện chính sách ưu tiên xếp nhà B3.', 
    thoiGianDangKy: "10/08-20/08/2022", 
    thoiGianO:"Tính từ ngày 01/09/2019 đến ngày 31/01/2020 (5 tháng). Trong trường hợp sinh viên chưa có chỗ ở khi nhập học, Trung tâm QL KTX vẫn tạo điều kiện cho sinh viên được ở từ 10/08/2019.",
    doiTuongXepO: 'K66, K67', 
    doiTuongUuTien: 'Sinh viên diện chính sách (con thương binh, liệt sỹ, bệnh binh, chất độc hóa học, vùng sâu vùng xa, biên giới, hải đảo, dân tộc….); Nữ sinh. ;Sinh viên có hoàn cảnh khó khăn. ;Sinh viên ngoại tỉnh.',
    khoanThuLePhi: 'Trang bị ban đầu: Thu 1 lần đầu năm Tiền ở và tiền nước sinh hoạt: Thu 5 tháng/SV Tiền điện sinh viên đóng theo công tơ sử dụng hàng tháng sẽ thông báo về các phòng.',
    dangKyTrucTiep: 'Đăng ký trực tiếp và đóng lệ phí tại P101- B9- Trung tâm QL KTX',
    luuY: 'Sinh viên sau khi đăng ký online cần kiểm tra email nếu được chấp nhận ở.'
  }

  dsDangKySV: any = [];
  currentPage: number=1;
  itemsPerPage: number=8;
  searchText: any;
  maToa: string=(Number(localStorage.getItem('roleId')) == 2) ? ('Tòa ' + localStorage.getItem('maToa')) : '';

  constructor (public dialog: MatDialog, private dkService: DangkyphongService){
    if(localStorage.getItem('role')){
      let data = localStorage.getItem('role');
      if(data != null) this.role = data.toString();
    }
  }
  ngOnInit(){
    this.loading = true;
    if(this.role.startsWith('guest')){
      this.loading = false;
    }
    if(this.role.startsWith('student')){
      this.getDanhSachDKTheoMSV();
    }
    if(this.role.startsWith('admin')){
      this.getDanhSachDangKy();
    }

    if(this.role.startsWith('manager')){
      this.getDanhSachDKTheoMaToa();
    }
  }

  getDanhSachDangKy(){
    this.dkService.getDanhSachDangKy().subscribe((res: any)=>{
      if(res.success){
        this.dsDangKySV = res.data;
        this.loading = false;
      }
      if(res.errors){
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách đăng ký thất bại!',
        });
      }
    })
  }

  getDanhSachDKTheoMSV(){
    this.dkService.getDSDKTheoMSSV(localStorage.getItem('manguoidung')).subscribe((res: any)=>{
      if(res.success){
        this.dsDangKySV = res.data;
        this.loading = false;
      }
      if(res.errors){
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách đăng ký thất bại!',
        });
      }
    })
  }

  getDanhSachDKTheoMaToa(){
    this.dkService.getDSDKTheoMaToa(localStorage.getItem('maToa')).subscribe((res: any)=>{
      if(res.success){
        this.dsDangKySV = res.data;
        this.loading = false;
      }
      if(res.errors){
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách đăng ký thất bại!',
        });
      }
    })
  }

  openDialog() {
    this.dialog.open(DangkyphongDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Tạo'){
        if(this.role.startsWith('student')){
          this.getDanhSachDKTheoMSV();
        }
      }
    });
  }

  xemDonDK(id: number){
    var dataView;
    this.dkService.getDonDangKyTheoId(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(DangkyphongDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'view'}
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin đăng ký phòng thất bại!',
        });
      }
    })
  }

  suaDonDK(id: number){
    var dataView;
    this.dkService.getDonDangKyTheoId(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(DangkyphongDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'edit'}
        }).afterClosed().subscribe((val)=>{
          if(val === 'Cập nhật'){
            this.getDanhSachDKTheoMSV();
          }
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin đăng ký phòng thất bại!',
        });
      }
    })
  }

  xoaDonDK(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa đơn đăng ký này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dkService.xoaDonDangKy(id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Đơn đăng ký bạn chọn đã được xóa.',
              'success'
            ).then((result)=>{
              if(this.role.startsWith('student')) this.getDanhSachDKTheoMSV();
              if(this.role.startsWith('admin')) this.getDanhSachDangKy();
              if(this.role.startsWith('manager')) this.getDanhSachDKTheoMaToa();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa đơn đăng ký.',
              'error'
            )
          }
        });
      }
    })
  }

  accept(id: number){
    this.dkService.chapNhanDK({formId: id}).subscribe((res: any)=>{
      if(res.success){
        Swal.fire({
          icon: 'success',
          title: 'Chấp nhận đăng ký thành công!',
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xảy ra khi chấp nhận đăng ký.',
          text: res.message
        });
      }
    })
  }

  deny(id: number){
    this.dkService.tuchoiDK({formId: id}).subscribe((res: any)=>{
      if(res.success){
        Swal.fire({
          icon: 'success',
          title: 'Từ chối đăng ký thành công!',
        });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xảy ra khi từ chối đăng ký.',
          text: res.message
        });
      }
    })
  }

}
