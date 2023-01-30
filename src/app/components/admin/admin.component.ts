import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAccount } from 'src/app/models/create-account.model';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  public loading = false;
  createAccountForm!: FormGroup;
  account: CreateAccount={
    id: 0, creationTime: '', userName: '', password:'', isActive: true, roleID: 0, maDoiTuong:'',
  }
  dsTaiKhoan: any = [];
  searchText: any;
  currentPage: number = 1;
  itemsPerPage: number = 7;
  total: any;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createAccountForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      roleID: ['', Validators.required],
      maDoiTuong: ['', Validators.required],
    });
    this.loading = true;
    this.getDanhSachTaiKhoan();
  }

  getDanhSachTaiKhoan() {
    this.adminService.getDanhSachTaiKhoan().subscribe((res: any) => {
      if (res.success) {
        this.loading = false;
        Object.keys(res.data).forEach((key) => {
          this.adminService
            .getThongTinCaNhan({
              roleId: res.data[key].roleID,
              userId: res.data[key].id,
            })
            .subscribe((rs: any) => {
              if (rs.success) {
                this.dsTaiKhoan.push({
                  id: res.data[key].id,
                  manguoidung:
                    res.data[key].roleID == 3
                      ? rs.data.maSinhVien
                      : rs.data.maCanBo,
                  tendangnhap: res.data[key].userName,
                  vaitro:
                    res.data[key].roleID == 3
                      ? 'Sinh viên'
                      : res.data[key].roleID == 1
                      ? 'Quản trị viên'
                      : 'Cán bộ',
                  thoigiantao: res.data[key].creationTime,
                  trangthai: res.data[key].isActive
                    ? 'Đang hoạt động'
                    : 'Vô hiệu hóa',
                });
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
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách tài khoản thất bại!',
        });
      }
      this.loading = false;
    });
  }

  xoaTaiKhoan(id: number) {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa tài khoản này?',
      text: 'Bạn sẽ không thể hoàn tác. Hãy cẩn thận.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa',
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
                if (Number(localStorage.getItem('roleId')) == 2) {
                  localStorage.removeItem('maToa');
                }
                this.router.navigateByUrl('/login').then(() => {
                  window.location.reload();
                });
              } else {
                this.getDanhSachTaiKhoan();
              }
            });
          }
          if (res.errors) {
            Swal.fire('Lỗi xảy ra khi xóa tài khoản.', 'error');
          }
        });
      }
    });
  }
  taoTaiKhoan(){
    this.loading = true;
    this.account.id = 0;
    this.account.isActive = true;
    console.log(this.createAccountForm);
    if (this.createAccountForm.valid) {
      this.account.userName = this.createAccountForm.value.userName;
      this.account.password = this.createAccountForm.value.password;
      this.account.maDoiTuong = this.createAccountForm.value.maDoiTuong;
      this.account.roleID = this.createAccountForm.value.roleID;
      this.account.creationTime = new Date().toISOString();
      this.adminService
        .taoTaiKhoan(this.account)
        .subscribe((res: any) => {
          if (res.success) {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: ' Cấp tài khoản thành công!',
            }).then((result) => {
              this.createAccountForm.reset();
            });
          }
          if (res.errors) {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: ' Cấp tài khoản thất bại!',
            });
          }
        });
    } else {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu nhập vào không hợp lệ.',
        text: 'Làm ơn kiểm tra lại, chú ý các trường bắt buộc có dấu *',
      });
    }
    this.loading = false;
  }
}
