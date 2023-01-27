import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DichVu } from 'src/app/models/dichvu.model';
import { DichvuService } from 'src/app/services/dichvu/dichvu.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dichvu-dialog',
  templateUrl: './dichvu-dialog.component.html',
  styleUrls: ['./dichvu-dialog.component.css']
})
export class DichvuDialogComponent {
  role: string="guest";
  dvForm !: FormGroup;
  dv: DichVu={
    id: 0, maLoaiDichVu: '', tenLoaiDichVu: '', moTa: '', donViTinh: '', donGia: 0, imageUrl: ''
  }
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  imageUrlPreview: string="../../../assets/images/dichvu/dien.jpg";
  fileToUpload: any = null;
  constructor(private formBuilder: FormBuilder, private dvService: DichvuService,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<DichvuDialogComponent>) {
      if (localStorage.getItem('role')) {
        let data = localStorage.getItem('role');
        if (data != null) this.role = data.toString();
      }
    }

  ngOnInit():void{
    this.dvForm = this.formBuilder.group({
      maloaidichvu: ['', Validators.required],
      tenloaidichvu: ['', Validators.required],
      mota: ['', Validators.required],
      donvitinh: ['', Validators.required],
      dongia: ['', Validators.required],
      anh: [''],
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
    if(this.data){
      var  dt = this.data.data[0];
      this.actionBtn = this.data.type=='edit' ? "Cập nhật" : 'Xem';
      this.dvForm.controls['maloaidichvu'].setValue(dt.maLoaiDichVu);
      this.dvForm.controls['tenloaidichvu'].setValue(dt.tenLoaiDichVu);
      this.dvForm.controls['mota'].setValue(dt.moTa);
      this.dvForm.controls['donvitinh'].setValue(dt.donViTinh);
      this.dvForm.controls['dongia'].setValue(dt.donGia);
      //this.dvForm.controls['anh'].setValue(dt.imageUrl);
      
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

  themHoacSuaLoaiDichVu(){
    if(this.data){
      this.dv.id = this.data.data[0].id;
    } else{
      this.dv.id = 0;
    }
    if(this.dvForm.valid){
      this.dv.maLoaiDichVu = this.dvForm.value.maloaidichvu;
      this.dv.tenLoaiDichVu = this.dvForm.value.tenloaidichvu;
      this.dv.moTa = this.dvForm.value.mota;
      this.dv.donViTinh = this.dvForm.value.donvitinh;
      this.dv.donGia = this.dvForm.value.dongia;
      
      this.dvService.themHoacSuaLoaiDichVu(this.dv).subscribe((res: any)=>{
        if(res.success){
          Swal.fire({
            icon: 'success',
            title: '' + this.actionBtn + ' dịch vụ thành công!',
          }).then((result)=>{
            this.dvForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if(res.errors){
          Swal.fire({
            icon: 'error',
            title: '' + this.actionBtn + ' dịch vụ thất bại!',
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
