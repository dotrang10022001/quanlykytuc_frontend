import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaiPhong } from 'src/app/models/loaiphong.model';
import { LoaiPhongService } from 'src/app/services/loaiphong/loaiphong.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-loaiphong-dialog',
  templateUrl: './loaiphong-dialog.component.html',
  styleUrls: ['./loaiphong-dialog.component.css']
})
export class LoaiPhongDialogComponent {
  role: string="guest";
  lpForm !: FormGroup;
  maToa: any=(Number(localStorage.getItem('roleId')) == 2) ? localStorage.getItem('maToa') : '';
  lp: LoaiPhong={
    id: 0, maLoaiPhong: '', tenLoaiPhong: '', moTa: '', gia: 0, sucChua: 0, maToa: ''
  }
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  constructor(private formBuilder: FormBuilder, private lpService: LoaiPhongService,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<LoaiPhongDialogComponent>) {
      if (localStorage.getItem('role')) {
        let data = localStorage.getItem('role');
        if (data != null) this.role = data.toString();
      }
    }

  ngOnInit():void{
    this.lpForm = this.formBuilder.group({
      maloaiphong: ['', Validators.required],
      tenloaiphong: ['', Validators.required],
      mota: ['', ],
      gia: ['', Validators.required],
      succhua: ['', Validators.required],
      matoa: [this.maToa, Validators.required]
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
    if(this.data){
      var  dt = this.data.data[0];
      this.actionBtn = this.data.type=='edit' ? "Cập nhật" : 'Xem';
      this.lpForm.controls['maloaiphong'].setValue(dt.maLoaiPhong);
      this.lpForm.controls['tenloaiphong'].setValue(dt.tenLoaiPhong);
      this.lpForm.controls['mota'].setValue(dt.moTa);
      this.lpForm.controls['gia'].setValue(dt.gia);
      this.lpForm.controls['succhua'].setValue(dt.sucChua);
      this.lpForm.controls['matoa'].setValue(dt.maToa);
      
      if(this.data.type=='edit') this.isReadonlyEdit = 'true';
      else this.isReadonlyView = 'true';
    }
  }

  name: string='';

  themHoacSuaLoaiPhong(){
    if(this.data){
      this.lp.id = this.data.data[0].id;
    } else{
      this.lp.id = 0;
    }
    if(this.lpForm.valid){
      this.lp.maLoaiPhong = this.lpForm.value.maloaiphong;
      this.lp.tenLoaiPhong = this.lpForm.value.tenloaiphong;
      this.lp.moTa = this.lpForm.value.mota;
      this.lp.gia = this.lpForm.value.gia;
      this.lp.sucChua = this.lpForm.value.succhua;
      this.lp.maToa = this.lpForm.value.matoa;
      
      this.lpService.themHoacSuaLoaiPhong(this.lp).subscribe((res: any)=>{
        if(res.success){
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' loại phòng thành công!',
          }).then((result)=>{
            this.lpForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if(res.errors){
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' loại phòng thất bại!',
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
