import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhanAnhService } from 'src/app/services/phananh/phananh.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-phananh-dialog',
  templateUrl: './phananh-dialog.component.html',
  styleUrls: ['./phananh-dialog.component.css']
})
export class PhanAnhDialogComponent {
  paForm !: FormGroup;
  pa: any={
    id: 0, tenPhanAnh: '', noiDung: '', maSinhVien: '', maPhong: '', maToa: '', imageUrl: '', trangThai: 0, creationTime: ''
  }
  actionBtn: string="Tạo";
  constructor(private formBuilder: FormBuilder, private paService: PhanAnhService,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<PhanAnhDialogComponent>) {
    }

  ngOnInit():void{
    this.paForm = this.formBuilder.group({
      tieude: ['', Validators.required],
      noidung: ['', Validators.required],
      matoa: ['', Validators.required],
    });
    if(this.data){
      var  dt = this.data.data[0];
      this.actionBtn = "Cập nhật";
      this.paForm.controls['tieude'].setValue(dt.tenPhanAnh);
      this.paForm.controls['noidung'].setValue(dt.noiDung);
      this.paForm.controls['matoa'].setValue(dt.maToa);
    }
  }

  name: string='';

  themHoacSuaPhanAnh(){
    if(this.data){
      this.pa.id = this.data.data[0].id;
    } else{
      this.pa.id = 0;
    }
    if(this.paForm.valid){
      this.pa.tenPhanAnh = this.paForm.value.tieude;
      this.pa.noiDung = this.paForm.value.noidung;
      this.pa.maToa = this.paForm.value.matoa;
      this.pa.maSinhVien = localStorage.getItem('manguoidung');
      this.pa.creationTime = new Date().toISOString();
      
      this.paService.themHoacSuaPhanAnh(this.pa).subscribe((res: any)=>{
        if(res.success){
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' phản ánh thành công!',
          }).then((result)=>{
            this.paForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if(res.errors){
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' phản ánh thất bại!',
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu nhập vào không hợp lệ. Làm ơn kiểm tra lại.',
      });
    }
  }
}
