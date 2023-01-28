import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanboDialogComponent } from 'src/app/dialogs/canbo-dialog/canbo-dialog.component';
import { SinhvienDialogComponent } from 'src/app/dialogs/sinhvien-dialog/sinhvien-dialog.component';
import { ThongtincanhanService } from 'src/app/services/thongtincanhan/thongtincanhan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thongtincanhan',
  templateUrl: './thongtincanhan.component.html',
  styleUrls: ['./thongtincanhan.component.css']
})
export class ThongtincanhanComponent {
  objData: any={
    userId: '',
    roleId: '',
  }
  data: any={};

  constructor(private ttcnService: ThongtincanhanService, public dialog: MatDialog){
    if (localStorage.getItem('roleId') && localStorage.getItem('userId')) {
      let roleId = localStorage.getItem('roleId');
      let userId = localStorage.getItem('userId');
      if (roleId != null && userId != null) {
        this.objData.roleId = roleId;
        this.objData.userId = userId;
      }
    }
  }

  ngOnInit(){
    this.getThongTinCaNhan(this.objData);
  }

  getThongTinCaNhan(obj: any){
    this.ttcnService.getThongTinCaNhan(obj).subscribe((res: any)=>{
      if(res.success){
        this.data = res.data;
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin thất bại!',
          text: 'Vui lòng thử lại sau.',
        });
      }
    });
  }
  suaCanBo(data: any){
    this.dialog.open(CanboDialogComponent,{
      width: '40%',
      height: '85%',
      data: {data: data, type: 'edit'}
    }).afterClosed().subscribe((val: any)=>{
      if(val === 'Cập nhật'){
        this.getThongTinCaNhan(this.objData);
      }
    });
  }

  suaSinhVien(data: any){
    this.dialog.open(SinhvienDialogComponent,{
      width: '40%',
      height: '85%',
      data: {data: data, type: 'edit'}
    }).afterClosed().subscribe((val)=>{
      if(val === 'Cập nhật'){
        this.getThongTinCaNhan(this.objData);
      }
    });
  }
}
