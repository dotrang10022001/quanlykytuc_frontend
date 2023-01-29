import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phong } from 'src/app/models/phong.model';
import { PhongService } from 'src/app/services/phong/phong.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoaiPhongService } from 'src/app/services/loaiphong/loaiphong.service';

@Component({
  selector: 'app-phong-dialog',
  templateUrl: './phong-dialog.component.html',
  styleUrls: ['./phong-dialog.component.css']
})
export class PhongDialogComponent {
  role: string="guest";
  pForm !: FormGroup;
  maToa: any=(Number(localStorage.getItem('roleId')) == 2) ? localStorage.getItem('maToa') : '';
  dsLoaiPhong: any=[];
  p: Phong={
    id: 0, maPhong: '', maLoaiPhong: '', soSinhVienO: 0, maToa: '', creationTime: ''
  }
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  constructor(private formBuilder: FormBuilder, private pService: PhongService,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<PhongDialogComponent>, private lpService: LoaiPhongService) {
      if (localStorage.getItem('role')) {
        let data = localStorage.getItem('role');
        if (data != null) this.role = data.toString();
      }
    }

  getDSLPTheoMaToa(){
    this.lpService.getDSLPTheoMaToa(this.maToa).subscribe((res: any)=>{
      if(res.success){
        this.dsLoaiPhong = res.data;
      }
    });
  }

  ngOnInit():void{
    this.getDSLPTheoMaToa();
    this.pForm = this.formBuilder.group({
      maloaiphong: ['', Validators.required],
      maphong: ['', Validators.required],
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
    if(this.data){
      var  dt = this.data.data[0];
      this.actionBtn = this.data.type=='edit' ? "Cập nhật" : 'Xem';
      this.pForm.controls['maloaiphong'].setValue(dt.maLoaiPhong);
      this.pForm.controls['maphong'].setValue(dt.maPhong);
      
      if(this.data.type=='edit') this.isReadonlyEdit = 'true';
      else this.isReadonlyView = 'true';
    }
  }

  name: string='';

  themHoacSuaPhong(){
    if(this.data){
      this.p.id = this.data.data[0].id;
      this.p.soSinhVienO = this.data.data[0].soSinhVienO;
    } else{
      this.p.id = 0;
    }
    if(this.pForm.valid){
      this.p.maLoaiPhong = this.pForm.value.maloaiphong;
      this.p.maPhong = this.pForm.value.maphong;
      this.p.creationTime = new Date().toISOString();
      this.p.maToa = this.maToa;
      
      this.pService.themHoacSuaPhong(this.p).subscribe((res: any)=>{
        if(res.success){
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' phòng thành công!',
          }).then((result)=>{
            this.pForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if(res.errors){
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' phòng thất bại!',
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
