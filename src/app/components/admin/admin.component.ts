import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminAccountDialogComponent } from 'src/app/dialogs/admin-account-dialog/admin-account-dialog.component';
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
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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
                      ? 'Sinh vi??n'
                      : res.data[key].roleID == 1
                      ? 'Qu???n tr??? vi??n'
                      : 'C??n b???',
                  thoigiantao: res.data[key].creationTime,
                  trangthai: res.data[key].isActive
                    ? '??ang ho???t ?????ng'
                    : 'V?? hi???u h??a',
                });
              }
              if (res.errors) {
                Swal.fire({
                  icon: 'error',
                  title: 'L???y m?? ng?????i d??ng th???t b???i!',
                });
              }
            });
        });
      }
      if (res.errors) {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'L???y danh s??ch t??i kho???n th???t b???i!',
        });
      }
      this.loading = false;
    });
  }

  xoaTaiKhoan(id: number) {
    Swal.fire({
      title: 'B???n ch???c ch???n mu???n x??a t??i kho???n n??y?',
      text: 'B???n s??? kh??ng th??? ho??n t??c. H??y c???n th???n.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'H???y',
      confirmButtonText: 'X??a',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.xoaTaiKhoan(id).subscribe((res) => {
          if (res) {
            Swal.fire(
              '???? x??a',
              'T??i kho???n b???n ch???n ???? ???????c x??a.',
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
            Swal.fire('L???i x???y ra khi x??a t??i kho???n.', 'error');
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
              title: ' C???p t??i kho???n th??nh c??ng!',
            }).then((result) => {
              this.createAccountForm.reset();
            });
          }
          if (res.errors) {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: ' C???p t??i kho???n th???t b???i!',
            });
          }
        });
    } else {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'D??? li???u nh???p v??o kh??ng h???p l???.',
        text: 'L??m ??n ki???m tra l???i, ch?? ?? c??c tr?????ng b???t bu???c c?? d???u *',
      });
    }
    this.loading = false;
  }
  suaTaiKhoan(row: any){
    this.dialog.open(AdminAccountDialogComponent,{
      width: '40%',
      height: '50%',
      data: {data: row, type: 'edit'}
    }).afterClosed().subscribe((val)=>{
      if(val === 'C???p nh???t'){
        // this.getDanhSachCanBo();
      }
    });
  }
}
