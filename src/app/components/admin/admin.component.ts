import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  dsTaiKhoan: any = [

  ]
  searchText: any;
  currentPage: number = 1;
  itemsPerPage: number = 7;
  total: any;

  constructor(private adminService: AdminService, private router: Router) {

  }

  ngOnInit() {
    this.getDanhSachTaiKhoan();
  }

  getDanhSachTaiKhoan() {
    this.adminService.getDanhSachTaiKhoan().subscribe((res: any) => {
      if (res.success) {
        Object.keys(res.data).forEach((key) => {
          this.adminService.getThongTinCaNhan({ roleId: res.data[key].roleID, userId: res.data[key].id }).subscribe((rs: any) => {
            if (rs.success) {
              this.dsTaiKhoan.push(
                {
                  id: res.data[key].id,
                  manguoidung: res.data[key].roleID == 3 ? rs.data.maSinhVien : rs.data.maCanBo,
                  tendangnhap: res.data[key].userName,
                  vaitro: res.data[key].roleID == 3 ? 'Sinh viên' : (res.data[key].roleID == 1 ? 'Quản trị viên' : 'Cán bộ'),
                  thoigiantao: res.data[key].creationTime,
                  trangthai: res.data[key].isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'
                }
              );
            }
            if (res.errors) {
              Swal.fire({
                icon: 'error',
                title: 'Lấy mã người dùng thất bại!',
              });
            }
          });
        });
      }
      if (res.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách tài khoản thất bại!',
        });
      }
    });
  }

  xoaTaiKhoan(id: number) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa tài khoản này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.xoaTaiKhoan(id).subscribe((res) => {
          if (res) {
            Swal.fire(
              'Đã xóa',
              'Tài khoản bạn chọn đã được xóa.',
              'success'
            ).then((result) => {
              if (id == Number(localStorage.getItem('userId'))) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('roleId');
                localStorage.removeItem('userId');
                localStorage.removeItem('manguoidung');
                if(Number(localStorage.getItem('roleId')) == 2){
                  localStorage.removeItem('maToa');
                }
                this.router.navigateByUrl('/login')
                  .then(() => {
                    window.location.reload();
                  });
              }else{
                this.getDanhSachTaiKhoan();
              }
            });
          }
          if(res.errors) {
            Swal.fire(
              'Lỗi xảy ra khi xóa tài khoản.',
              'error'
            )
          }
        });
      }
    })
  }
}
