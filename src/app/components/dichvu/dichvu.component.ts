import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DichvuDialogComponent } from 'src/app/dialogs/dichvu-dialog/dichvu-dialog.component';
import { DichVu } from 'src/app/models/dichvu.model';
import { DichvuService } from 'src/app/services/dichvu/dichvu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.css']
})
export class DichvuComponent {
  role: string="guest";
  dsDichVu: DichVu[] = [];
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=6;

  constructor (public dialog: MatDialog, private dvService: DichvuService){
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }

  ngOnInit(){
    this.getDanhSachLoaiDichVu();
  }

  getDanhSachLoaiDichVu(){
    this.dvService.getDanhSachLoaiDichVu().subscribe((res: any)=>{
      if(res.success){
        this.dsDichVu = res.data;
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách dịch vụ thất bại!',
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(DichvuDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDanhSachLoaiDichVu();
      }
    });
  }

  xemLoaiDichVu(id: number){
    var dataView;
    this.dvService.getLoaiDichVuById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(DichvuDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'view'}
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin dịch vụ thất bại!',
        });
      }
    })
    
  }

  suaLoaiDichVu(id: number){
    var dataView;
    this.dvService.getLoaiDichVuById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(DichvuDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'edit'}
        }).afterClosed().subscribe((val)=>{
          if(val === 'Cập nhật'){
            this.getDanhSachLoaiDichVu();
          }
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin dịch vụ thất bại!',
        });
      }
    })
    
  }

  xoaLoaiDichVu(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa loại dịch vụ này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dvService.xoaLoaiDichVu(id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Loại dịch vụ bạn yêu cầu đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDanhSachLoaiDichVu();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa loại dịch vụ.',
              'error'
            )
          }
        });
      }
    })
  }

}
