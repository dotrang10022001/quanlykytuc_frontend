import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhongDialogComponent } from 'src/app/dialogs/phong-dialog/phong-dialog.component';
import { Phong } from 'src/app/models/phong.model';
import { PhongService } from 'src/app/services/phong/phong.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.css']
})
export class PhongComponent {
  role: string="guest";
  dsPhong: Phong[] = [];
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=12;
  maToa: string=(Number(localStorage.getItem('roleId')) == 2) ? ('Tòa ' + localStorage.getItem('maToa')) : '';

  constructor (public dialog: MatDialog, private pService: PhongService){
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }

  ngOnInit(){
    if(this.maToa == '') this.getDanhSachPhong();
    else {
      this.getDSPTheoMaToa();
    }
  }

  getDSPTheoMaToa(){
    this.pService.getDSPTheoMaToa(localStorage.getItem('maToa')).subscribe((res: any)=>{
      if(res.success){
        this.dsPhong = res.data;
        console.log(res.data);
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách phòng thất bại!',
        });
      }
    });
  }

  getDanhSachPhong(){
    this.pService.getDanhSachPhong().subscribe((res: any)=>{
      if(res.success){
        this.dsPhong = res.data;
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách phòng thất bại!',
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(PhongDialogComponent, {
      width: '40%',
      height: '55%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDSPTheoMaToa();
      }
    });
  }

  suaPhong(id: number){
    var dataView;
    this.pService.getPhongById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(PhongDialogComponent, {
          width: '40%',
          height: '55%',
          data: {data: dataView, type: 'edit'}
        }).afterClosed().subscribe((val)=>{
          if(val === 'Cập nhật'){
            this.getDSPTheoMaToa();
          }
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin phòng thất bại!',
        });
      }
    })
    
  }

  xoaPhong(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa phòng này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pService.xoaPhong(id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Phòng bạn yêu cầu đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDSPTheoMaToa();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa phòng.',
              'error'
            )
          }
        });
      }
    })
  }

}
