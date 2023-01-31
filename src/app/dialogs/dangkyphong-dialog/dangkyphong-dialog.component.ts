import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DangKyPhong } from 'src/app/models/dangkyphong.model';
import { DangkyphongService } from 'src/app/services/dangkyphong/dangkyphong.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { S3Handler } from 'src/app/services/image/test';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-dangkyphong-dialog',
  templateUrl: './dangkyphong-dialog.component.html',
  styleUrls: ['./dangkyphong-dialog.component.css'],
})
export class DangkyphongDialogComponent {
  role: String = "guest";
  masinhvien: any = (Number(localStorage.getItem('roleId')) == 3) ? localStorage.getItem('manguoidung') : '';
  hoten: any = (Number(localStorage.getItem('roleId')) == 3) ? localStorage.getItem('hoten') : '';
  public loading = false;
  dkForm!: FormGroup;
  dsToa: any = [];
  donDangKy: DangKyPhong = {
    id: 0,
    maSinhVien: '',
    hoTen: '',
    creationTime: '',
    thoiDiemDK: '',
    maPhong: '',
    maToa: '',
    trangThai: 0,
    ky: '',
    thongTinSinhVien: ''
  };
  isReadonlyView: string = 'false';
  actionBtn: string = 'Tạo';

  constructor(
    private formBuilder: FormBuilder,
    private dkService: DangkyphongService,
    private loginService: LoginService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DangkyphongDialogComponent>
  ) {
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }

  getDanhSachToa() {
    this.dkService.getDanhSachToa().subscribe((res: any) => {
      if (res.success) {
        this.dsToa = res.data;
      }
      if (res.errors) {
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xảy ra khi lấy danh sách tòa'
        });
      }
    })
  }

  ngOnInit(): void {
    this.getDanhSachToa();
    this.dkForm = this.formBuilder.group({
      masinhvien: [this.masinhvien, Validators.required],
      hoten: [this.hoten, Validators.required],
      maphong: ['', Validators.required],
      matoa: ['', Validators.required],
      ky: ['', Validators.required],
      thongtinbosung: [''],
    });
    this.isReadonlyView = 'false';
    if (this.data) {
      this.actionBtn = this.data.type == 'edit' ? 'Cập nhật' : 'Xem';
      this.dkForm.controls['masinhvien'].setValue(this.data.data[0].maSinhVien);
      this.dkForm.controls['hoten'].setValue(this.data.data[0].hoTen);
      this.dkForm.controls['maphong'].setValue(this.data.data[0].maPhong);
      this.dkForm.controls['matoa'].setValue(this.data.data[0].maToa);
      this.dkForm.controls['ky'].setValue(this.data.data[0].ky);
      this.dkForm.controls['thongtinbosung'].setValue(this.data.data[0].thongTinSinhVien);

      if (this.data.type != 'edit') this.isReadonlyView = 'true';
    }
  }

  async taoHoacCapNhatDonDangKy() {
    {
      this.loading = true;
      if (this.data) {
        this.donDangKy.id = this.data.data[0].id;
        this.donDangKy.thoiDiemDK = this.data.data[0].thoiDiemDK;
        this.donDangKy.creationTime = this.data.data[0].creationTime;
      } else {
        this.donDangKy.id = 0;
      }
      if (this.dkForm.valid) {
        this.donDangKy.maSinhVien = this.dkForm.value.masinhvien;
        this.donDangKy.hoTen = this.dkForm.value.hoten;
        if (this.donDangKy.id == 0) {
          this.donDangKy.thoiDiemDK = new Date().toISOString();
          this.donDangKy.creationTime = new Date().toISOString();
        }
        this.donDangKy.ky = this.dkForm.value.ky;
        this.donDangKy.thongTinSinhVien = this.dkForm.value.thongtinbosung;
        this.donDangKy.maPhong = this.dkForm.value.maphong;
        this.donDangKy.maToa = this.dkForm.value.matoa;

        this.dkService
          .svTaoHoacCapNhatDangKyPhong(this.donDangKy)
          .subscribe((res: any) => {
            if (res.success) {
              this.loading = false;
              Swal.fire({
                icon: 'success',
                title: '' + this.actionBtn + ' đơn đăng ký thành công!',
                text: (this.donDangKy.id == 0) ?'Làm ơn theo dõi email để nhận thông tin chi tiết cho việc đăng ký phòng.' : ''
              }).then((result) => {
                this.dkForm.reset();
                this.dialogRef.close(this.actionBtn);
              });
            }
            if (res.errors) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                title: '' + this.actionBtn + ' đơn đăng ký thất bại!',
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
}
