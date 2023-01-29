import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SuDungDichVu } from 'src/app/models/sudungdichvu.model';
import { SudungdichvuService } from 'src/app/services/sudungdichvu/sudungdichvu.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DichvuService } from 'src/app/services/dichvu/dichvu.service';

@Component({
  selector: 'app-sudungdichvu-dialog',
  templateUrl: './sudungdichvu-dialog.component.html',
  styleUrls: ['./sudungdichvu-dialog.component.css']
})
export class SudungdichvuDialogComponent {
  sddvForm !: FormGroup;
  sddv: SuDungDichVu = {
    id: 0, maDoiTuongSD: '', maLoaiDichVu: '', trangThai: 0, soLuongSD: 0, loaiDoiTuong: 0, thoiGianBD: '', thoiGianKT: ''
  }
  isReadonlyEdit: string = "false";
  isReadonlyView: string = "false";
  actionBtn: string = "Thêm";
  dsLoaiDichVu: any = [];
  constructor(private formBuilder: FormBuilder, private sddvService: SudungdichvuService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<SudungdichvuDialogComponent>, private dvService: DichvuService) { }


  getDSLDV() {
    this.dvService.getDanhSachLoaiDichVu().subscribe((res: any) => {
      if (res.success) {
        this.dsLoaiDichVu = res.data;
      }
    });
  }
  ngOnInit(): void {
    this.getDSLDV();
    this.sddvForm = this.formBuilder.group({
      madoituongsudung: ['', Validators.required],
      maloaidichvu: ['', Validators.required],
      loaidoituong: ['', Validators.required],
      luongsudung: ['', Validators.required],
      trangthai: ['', [Validators.required]],
      thoigianbatdau: ['', Validators.required],
      thoigianketthuc: ['', Validators.required],
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
    if (this.data) {
      this.actionBtn = this.data.type == 'edit' ? "Cập nhật" : 'Xem';
      this.sddvForm.controls['madoituongsudung'].setValue(this.data.data.maDoiTuongSD);
      this.sddvForm.controls['maloaidichvu'].setValue(this.data.data.maLoaiDichVu);
      if (this.data.data.loaiDoiTuong == 1) this.sddvForm.controls['loaidoituong'].setValue('1');
      else this.sddvForm.controls['loaidoituong'].setValue('2');
      if (this.data.data.trangThai == 0) this.sddvForm.controls['trangthai'].setValue('0');
      else this.sddvForm.controls['trangthai'].setValue('1');
      this.sddvForm.controls['luongsudung'].setValue(this.data.data.soLuongSD);
      this.sddvForm.controls['thoigianbatdau'].setValue(this.data.data.thoiGianBD);
      this.sddvForm.controls['thoigianketthuc'].setValue(this.data.data.thoiGianKT);

      if (this.data.type == 'edit') this.isReadonlyEdit = 'true';
      else this.isReadonlyView = 'true';
    }
  }

  themHoacSuaSDDV() {
    if (this.data) {
      this.sddv.id = this.data.data.id;
      this.sddv.thoiGianBD = this.data.data.thoiGianBD;
      this.sddv.thoiGianKT = this.data.data.thoiGianKT;
    } else {
      this.sddv.id = 0;
    }
    if (this.sddvForm.valid) {
      this.sddv.maDoiTuongSD = this.sddvForm.value.madoituongsudung;
      this.sddv.maLoaiDichVu = this.sddvForm.value.maloaidichvu;
      this.sddv.trangThai = Number(this.sddvForm.value.trangthai);
      this.sddv.loaiDoiTuong = Number(this.sddvForm.value.loaidoituong);
      this.sddv.soLuongSD = Number(this.sddvForm.value.luongsudung);
      var date = new Date(this.sddvForm.value.thoigianbatdau);
      if (this.sddv.thoiGianBD != '') {
        if (date.getDate() != new Date(this.sddv.thoiGianBD).getDate()) {
          date.setDate(date.getDate() + 1);
        }
      } else {
        date.setDate(date.getDate() + 1);
      }
      this.sddv.thoiGianBD = date.toISOString();
      var date = new Date(this.sddvForm.value.thoigianketthuc);
      if (this.sddv.thoiGianKT != '') {
        if (date.getDate() != new Date(this.sddv.thoiGianKT).getDate()) {
          date.setDate(date.getDate() + 1);
        }
      } else {
        date.setDate(date.getDate() + 1);
      }
      this.sddv.thoiGianKT = date.toISOString();
      console.log(this.sddvForm.value);
      this.sddvService.themHoacSuaSDDV(this.sddv).subscribe((res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' thông tin sử dụng dịch vụ thành công!',
          }).then((result) => {
            this.sddvForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if (res.errors) {
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' thông tin sử dụng dịch vụ thất bại!',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu nhập vào không hợp lệ.',
        text: 'Làm ơn kiểm tra lại, chú ý các trường bắt buộc có dấu *'
      });
    }
  }
}
