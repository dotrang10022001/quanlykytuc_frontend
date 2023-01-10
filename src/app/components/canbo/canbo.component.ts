import { Component, OnInit } from '@angular/core';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-canbo',
  templateUrl: './canbo.component.html',
  styleUrls: ['./canbo.component.css']
})
export class CanboComponent{

  dsCanBo: Canbo[]=[]
  
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=5;

  constructor(private canboService: CanboService){
    
  }

  ngOnInit(){
    this.getDanhSachCB();
  }

  getDanhSachCB(){
    this.canboService.getDanhSachCB().subscribe((res: any)=>{
      if(res.success){
        this.dsCanBo = res.data;
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xảy ra khi lấy danh sách cán bộ.',
        });
      }
    });
  }

  canbo: any={
    maCanBo: '', gioiTinh: '', ngaySinh: '', email: '', soDienThoai: '', chucVu: '', hoTen: '', imageUrl: '', id: 0, creationTime: ''
  }

  themCanBo(canBoForm: any){
    this.canbo.maCanBo = canBoForm.value.macanbo;
    this.canbo.hoTen = canBoForm.value.hoten;
    this.canbo.gioiTinh = canBoForm.value.gioitinh;
    this.canbo.ngaySinh = canBoForm.value.ngaysinh;
    this.canbo.soDienThoai = canBoForm.value.sodienthoai;
    this.canbo.chucVu = canBoForm.value.chucvu;
    this.canbo.imageUrl = canBoForm.value.anh;
    this.canbo.email = canBoForm.value.email;
    this.canbo.creationTime = new Date().toDateString();

    console.log(this.canbo);
    this.canboService.themCanBo(this.canbo).subscribe((res: any)=>{
      if(res.success){
        Swal.fire({
          icon: 'success',
          title: 'Thêm cán bộ thành công!',
        });
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Thêm cán bộ thất bại!',
        });
      }
    })
  }

  xemCanBo(id: number){
    this.canboService.xemCanBo(id).subscribe((res: any)=>{
      if(res.success){
        
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xảy ra khi lấy thông tin cán bộ.',
        });
      }
    });
    
  }



}
