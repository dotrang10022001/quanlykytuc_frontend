import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaiPhongDialogComponent } from 'src/app/dialogs/loaiphong-dialog/loaiphong-dialog.component';
import { LoaiPhong } from 'src/app/models/loaiphong.model';
import { LoaiPhongService } from 'src/app/services/loaiphong/loaiphong.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loaiphong',
  templateUrl: './loaiphong.component.html',
  styleUrls: ['./loaiphong.component.css']
})
export class LoaiphongComponent {
  role: string="guest";
  dsLoaiPhong: LoaiPhong[] = [];
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=3;
  maToa: string=(Number(localStorage.getItem('roleId')) == 2) ? ('Tòa ' + localStorage.getItem('maToa')) : '';

  constructor (public dialog: MatDialog, private lpService: LoaiPhongService){
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }

  ngOnInit(){
    if(this.maToa == '') this.getDanhSachLoaiPhong();
    else {
      this.getDSLPTheoMaToa();
    }
  }

  getDSLPTheoMaToa(){
    this.lpService.getDSLPTheoMaToa(localStorage.getItem('maToa')).subscribe((res: any)=>{
      if(res.success){
        this.dsLoaiPhong = res.data;
        console.log(res.data);
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách loại phòng thất bại!',
        });
      }
    });
  }

  getDanhSachLoaiPhong(){
    this.lpService.getDanhSachLoaiPhong().subscribe((res: any)=>{
      if(res.success){
        this.dsLoaiPhong = res.data;
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách loại phòng thất bại!',
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(LoaiPhongDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDSLPTheoMaToa();
      }
    });
  }

  xemLoaiPhong(id: number){
    var dataView;
    this.lpService.getLoaiPhongById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(LoaiPhongDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'view'}
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin loại phòng thất bại!',
        });
      }
    })
    
  }

  suaLoaiPhong(id: number){
    var dataView;
    this.lpService.getLoaiPhongById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(LoaiPhongDialogComponent, {
          width: '40%',
          height: '85%',
          data: {data: dataView, type: 'edit'}
        }).afterClosed().subscribe((val)=>{
          if(val === 'Cập nhật'){
            this.getDSLPTheoMaToa();
          }
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin loại phòng thất bại!',
        });
      }
    })
    
  }

  xoaLoaiPhong(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa loại phòng này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.lpService.xoaLoaiPhong(id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Loại phòng bạn yêu cầu đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDSLPTheoMaToa();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa loại phòng.',
              'error'
            )
          }
        });
      }
    })
  }

}
