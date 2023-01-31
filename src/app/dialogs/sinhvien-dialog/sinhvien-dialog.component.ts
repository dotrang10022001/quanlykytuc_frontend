import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SinhVien } from 'src/app/models/sinhvien.model';
import { SinhvienService } from 'src/app/services/sinhvien/sinhvien.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { S3Handler } from 'src/app/services/image/test';

@Component({
  selector: 'app-sinhvien-dialog',
  templateUrl: './sinhvien-dialog.component.html',
  styleUrls: ['./sinhvien-dialog.component.css'],
})
export class SinhvienDialogComponent {
  public loading = false;
  imageUrlPreview: string = '../../../assets/images/canbo_upload/default.jpg';
  svForm!: FormGroup;
  sinhvien: SinhVien = {
    id: 0,
    maSinhVien: '',
    hoTen: '',
    gioiTinh: '',
    ngaySinh: '',
    soDienthoai: '',
    email: '',
    lop: '',
    khoa: '',
    vien: '',
    hoTenCha: '',
    hoTenMe: '',
    noiThuongTru: '',
    creationTime: '',
    accountId: 0,
    imageUrl: '',
  };
  fileToUpload: any = null;
  isReadonlyEdit: string = 'false';
  isReadonlyView: string = 'false';
  actionBtn: string = 'Thêm';
  constructor(
    private formBuilder: FormBuilder,
    private svService: SinhvienService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SinhvienDialogComponent>
  ) {}

  ngOnInit(): void {
    this.svForm = this.formBuilder.group({
      masinhvien: ['', Validators.required],
      hoten: ['', Validators.required],
      gioitinh: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      sodienthoai: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      lop: ['', Validators.required],
      khoa: ['', Validators.required],
      vien: ['', Validators.required],
      anh: ['', Validators.required],
      hotencha: [''],
      hotenme: [''],
      noithuongtru: [''],
    });
    this.isReadonlyEdit = 'false';
    this.isReadonlyView = 'false';
    if (this.data) {
      this.imageUrlPreview = this.data.data.imageUrl;
      this.actionBtn = this.data.type == 'edit' ? 'Cập nhật' : 'Xem';
      this.svForm.controls['masinhvien'].setValue(this.data.data.maSinhVien);
      this.svForm.controls['hoten'].setValue(this.data.data.hoTen);
      if (this.data.data.gioiTinh.startsWith('Nam'))
        this.svForm.controls['gioitinh'].setValue('Nam');
      else this.svForm.controls['gioitinh'].setValue('Nữ');
      this.svForm.controls['ngaysinh'].setValue(this.data.data.ngaySinh);
      this.svForm.controls['sodienthoai'].setValue(this.data.data.soDienthoai);
      this.svForm.controls['email'].setValue(this.data.data.email);
      this.svForm.controls['vien'].setValue(this.data.data.vien);
      this.svForm.controls['khoa'].setValue(this.data.data.khoa);
      this.svForm.controls['lop'].setValue(this.data.data.lop);
      this.svForm.controls['hotencha'].setValue(this.data.data.hoTenCha);
      this.svForm.controls['hotenme'].setValue(this.data.data.hoTenMe);
      this.svForm.controls['noithuongtru'].setValue(
        this.data.data.noiThuongTru
      );

      if (this.data.type == 'edit') this.isReadonlyEdit = 'true';
      else this.isReadonlyView = 'true';
    }
  }

  async handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    // console.log('image to upload: ', this.fileToUpload.name);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  async handleUploadFileToS3(file: any): Promise<string> {
    var res = await this.s3Handler.upload('toan', file);
    console.log('res canbo: ', res.Location);
    return res.Location;
  }
  async themHoacSuaSinhVien() {
    if (this.fileToUpload == null && this.actionBtn == 'Thêm') {
      Swal.fire({
        icon: 'error',
        title: 'Chưa chọn ảnh hoặc ảnh không hợp lệ.',
        text: 'Vui lòng chọn lại file ảnh *',
      });
    } else {
      this.loading = true;
      var imageUrl = null;
      if (this.fileToUpload != null) {
        imageUrl = await this.handleUploadFileToS3(this.fileToUpload);
      }
      if (this.data) {
        this.sinhvien.id = this.data.data.id;
        this.sinhvien.ngaySinh = this.data.data.ngaySinh;
        this.sinhvien.accountId = this.data.data.accountId;
      } else {
        this.sinhvien.id = 0;
      }
      if (this.svForm.valid) {
        this.sinhvien.maSinhVien = this.svForm.value.masinhvien;
        this.sinhvien.hoTen = this.svForm.value.hoten;
        this.sinhvien.gioiTinh = this.svForm.value.gioitinh;
        var date = new Date(this.svForm.value.ngaysinh);
        if (this.sinhvien.ngaySinh != '') {
          if (date.getDate() != new Date(this.sinhvien.ngaySinh).getDate()) {
            date.setDate(date.getDate() + 1);
          }
        } else {
          date.setDate(date.getDate() + 1);
        }
        this.sinhvien.ngaySinh = date.toISOString();
        this.sinhvien.email = this.svForm.value.email;
        this.sinhvien.soDienthoai = this.svForm.value.sodienthoai;
        this.sinhvien.lop = this.svForm.value.lop;
        this.sinhvien.khoa = this.svForm.value.khoa;
        this.sinhvien.vien = this.svForm.value.vien;
        this.sinhvien.hoTenCha = this.svForm.value.hotencha;
        this.sinhvien.hoTenMe = this.svForm.value.hotenme;
        this.sinhvien.imageUrl =
          imageUrl != null ? imageUrl : this.data.data.imageUrl;
        this.sinhvien.noiThuongTru = this.svForm.value.noithuongtru;
        this.sinhvien.creationTime = new Date().toISOString();

        this.svService
          .themHoacSuaSinhVien(this.sinhvien)
          .subscribe((res: any) => {
            if (res.success) {
              this.loading = false;
              Swal.fire({
                icon: 'success',
                title: '' + this.actionBtn + ' sinh viên thành công!',
              }).then((result) => {
                this.svForm.reset();
                this.dialogRef.close(this.actionBtn);
              });
            }
            if (res.errors) {
              this.loading = false;
              Swal.fire({
                icon: 'error',
                title: '' + this.actionBtn + ' sinh viên thất bại!',
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
