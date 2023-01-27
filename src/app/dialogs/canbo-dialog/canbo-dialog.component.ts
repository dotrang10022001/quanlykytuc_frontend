import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-canbo-dialog',
  templateUrl: './canbo-dialog.component.html',
  styleUrls: ['./canbo-dialog.component.css']
})
export class CanboDialogComponent {
  cbForm !: FormGroup;
  canbo: Canbo={
    id: 0, maCanBo: '', hoTen: '', gioiTinh: '', ngaySinh: '', soDienThoai: '', email: '', imageUrl: '', chucVu: '', creationTime: '', accountId: 0
  }
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  imageUrlPreview: string="../../../assets/images/canbo_upload/default.jpg";
  fileToUpload: any = null;
  constructor(private formBuilder: FormBuilder, private cbService: CanboService,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<CanboDialogComponent>) {}

  ngOnInit():void{
    this.cbForm = this.formBuilder.group({
      macanbo: ['', Validators.required],
      hoten: ['', Validators.required],
      gioitinh: ['', Validators.required],
      ngaysinh: ['', Validators.required],
      sodienthoai: ['', [Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.email]],
      anh: ['', Validators.required],
      chucvu: ['', Validators.required],
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
    if(this.data){
      this.actionBtn = this.data.type=='edit' ? "Cập nhật" : 'Xem';
      this.cbForm.controls['macanbo'].setValue(this.data.data.maCanBo);
      this.cbForm.controls['hoten'].setValue(this.data.data.hoTen);
      if(this.data.data.gioiTinh.startsWith('Nam')) this.cbForm.controls['gioitinh'].setValue('Nam');
      else this.cbForm.controls['gioitinh'].setValue('Nữ');
      this.cbForm.controls['ngaysinh'].setValue(this.data.data.ngaySinh);
      this.cbForm.controls['sodienthoai'].setValue(this.data.data.soDienThoai);
      this.cbForm.controls['email'].setValue(this.data.data.email);
      //this.cbForm.controls['anh'].setValue(this.data.data.imageUrl);
      this.cbForm.controls['chucvu'].setValue(this.data.data.chucVu);
      
      if(this.data.type=='edit') this.isReadonlyEdit = 'true';
      else this.isReadonlyView = 'true';
    }
  }

  handleFileInput(event: any){
    this.fileToUpload = event.target.files.item(0);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  name: string='';

  themHoacSuaCanBo(){
    if(this.data){
      this.canbo.id = this.data.data.id;
      this.canbo.ngaySinh = this.data.data.ngaySinh;
      this.canbo.accountId = this.data.data.accountId;
    } else{
      this.canbo.id = 0;
    }
    if(this.cbForm.valid){
      this.canbo.maCanBo = this.cbForm.value.macanbo;
      this.canbo.hoTen = this.cbForm.value.hoten;
      this.canbo.gioiTinh = this.cbForm.value.gioitinh??'';
      var date = new Date(this.cbForm.value.ngaysinh);
      if(this.canbo.ngaySinh != ''){
        if(date.getDate()!=new Date(this.canbo.ngaySinh).getDate()){
          date.setDate(date.getDate()+1);
        }
      }else{
        date.setDate(date.getDate()+1);
      }
      this.canbo.ngaySinh = date.toISOString();
      this.canbo.email = this.cbForm.value.email;
      this.canbo.soDienThoai = this.cbForm.value.sodienthoai.toString();
      this.canbo.imageUrl = this.fileToUpload != null ? this.fileToUpload.name : 'default.jpg';
      this.canbo.chucVu = this.cbForm.value.chucvu;
      this.canbo.creationTime = new Date().toISOString();
      
      this.cbService.themHoacSuaCanBo(this.canbo).subscribe((res: any)=>{
        if(res.success){
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' cán bộ thành công!',
          }).then((result)=>{
            this.cbForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if(res.errors){
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' cán bộ thất bại!',
          });
        }
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu nhập vào không hợp lệ.',
        text: 'Làm ơn kiểm tra lại, chú ý các trường bắt buộc có dấu *'
      });
    }
  }
}
