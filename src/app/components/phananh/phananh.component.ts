import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhanAnhDialogComponent } from 'src/app/dialogs/phananh-dialog/phananh-dialog.component';
import { PhanAnhService } from 'src/app/services/phananh/phananh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-phananh',
  templateUrl: './phananh.component.html',
  styleUrls: ['./phananh.component.css']
})
export class PhanAnhComponent {
  role: string="guest";
  dsPhanAnh: any=[];
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=8;

  constructor (public dialog: MatDialog, private paService: PhanAnhService){
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }

  ngOnInit(){
    this.getDanhSachPhanAnh();
  }


  getDanhSachPhanAnh(){
    this.dsPhanAnh = [];
    this.paService.getDanhSachPhanAnh().subscribe((res: any)=>{
      if(res.success){
        Object.keys(res.data).forEach((key) => {
          this.dsPhanAnh.push(
            {
              id: res.data[key].id,
              masinhvien: res.data[key].maSinhVien != localStorage.getItem('manguoidung') ? 'xxxxxxxx' : res.data[key].maSinhVien,
              matoa: res.data[key].maToa,
              tieudephananh: res.data[key].tenPhanAnh,
              noidungphananh: res.data[key].noiDung,
              thoigiantao: res.data[key].creationTime,
              trangthai: res.data[key].trangThai == 0 ? 'Chưa xử lý' : 'Đã xử lý',
              isEditSV: ((res.data[key].maSinhVien != localStorage.getItem('manguoidung')) || res.data[key].trangThai != 0) ? 'false' : 'true',
              isCheckCB: ((res.data[key].maToa == localStorage.getItem('maToa')) && res.data[key].trangThai == 0) ? 'true' : 'false',
              isUndoCB: ((res.data[key].maToa == localStorage.getItem('maToa')) && res.data[key].trangThai == 1) ? 'true' : 'false',
            }
          );
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách phản ánh thất bại!',
        });
      }
    });
  }

  openDialog() {
    this.dialog.open(PhanAnhDialogComponent, {
      width: '40%',
      height: '70%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Tạo'){
        this.getDanhSachPhanAnh();
      }
    });
  }

  capNhatTrangThai(id: number){
    this.paService.getPhanAnhById(id).subscribe((res: any)=>{
      if(res.success){
        res.data[0].trangThai = 1 - res.data[0].trangThai;
        this.paService.themHoacSuaPhanAnh(res.data[0]).subscribe((rs: any)=>{
          if(rs.success){
            Swal.fire({
              icon: 'success',
              title: res.data[0].trangThai == 1 ? 'Cập nhật trạng thái thành công!' : 'Hoàn tác thành công',
            }).then((result)=>{
              this.getDanhSachPhanAnh();
            });
          }
          if(rs.errors){
            Swal.fire({
              icon: 'error',
              title: res.data[0].trangThai == 1 ? 'Cập nhật trạng thái thất bại!' : 'Hoàn tác thất bại',
            });
          }
        })
      }
    })
  }

  suaPhanAnh(id: number){
    var dataView;
    this.paService.getPhanAnhById(id).subscribe((res)=>{
      if(res.success){
        dataView = res.data;
        this.dialog.open(PhanAnhDialogComponent, {
          width: '40%',
          height: '70%',
          data: {data: dataView, type: 'edit'}
        }).afterClosed().subscribe((val)=>{
          if(val === 'Cập nhật'){
            this.getDanhSachPhanAnh();
          }
        });
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy thông tin phản ánh thất bại!',
        });
      }
    })
    
  }

  xoaPhanAnh(id: number){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa phản ánh này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paService.xoaPhanAnh(id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Phản ánh bạn yêu cầu đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDanhSachPhanAnh();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa phản ánh.',
              'error'
            )
          }
        });
      }
    })
  }

}
