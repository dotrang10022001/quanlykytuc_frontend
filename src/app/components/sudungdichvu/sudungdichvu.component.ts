import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SudungdichvuDialogComponent } from 'src/app/dialogs/sudungdichvu-dialog/sudungdichvu-dialog.component';
import { SudungdichvuService } from 'src/app/services/sudungdichvu/sudungdichvu.service';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SuDungDichVu } from 'src/app/models/sudungdichvu.model';

@Component({
  selector: 'app-sudungdichvu',
  templateUrl: './sudungdichvu.component.html',
  styleUrls: ['./sudungdichvu.component.css']
})
export class SudungdichvuComponent{
  public loading = false;
  displayedColumns?: string[];
  dataSource!: MatTableDataSource<any>;
  loaiDoiTuong: number = 1;
  colorSVCB: string = 'primary';
  colorPT: string = '';
  role: string="guest";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private sddvService: SudungdichvuService){
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }
  ngOnInit(){
    this.loading = true;
    this.getDanhSachSDDV();
    if(this.role.startsWith('manager')){
      this.displayedColumns = ['madoituong', 'tendichvu', 'luongsudung', 'donvitinh', 'dongia', 'tongtien', 'trangthai', 'hanhdong'];
    }else{
      this.displayedColumns = ['madoituong', 'tendichvu', 'luongsudung', 'donvitinh', 'dongia', 'tongtien', 'trangthai'];
    }
  }

  getDanhSachSDDV(){
    this.sddvService.getDanhSachSDDV(this.loaiDoiTuong).subscribe((res)=>{
      if(res.success){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }
      if(res.errors){
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách thông tin sử dụng dịch vụ thất bại!',
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(SudungdichvuDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDanhSachSDDV();
      }
    });
  }

  xemThongTinSDDV(row: any){
    this.dialog.open(SudungdichvuDialogComponent, {
      width: '40%',
      height: '85%',
      data: {data: row, type: 'view'}
    });
  }

  suaThongTinSDDV(row: any){
    this.dialog.open(SudungdichvuDialogComponent,{
      width: '40%',
      height: '85%',
      data: {data: row, type: 'edit'}
    }).afterClosed().subscribe((val)=>{
      if(val === 'Cập nhật'){
        this.getDanhSachSDDV();
      }
    });
  }

  xoaThongTinSDDV(row: any){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa thông tin này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sddvService.xoaSDDV(row.id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Thông tin bạn chọn đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDanhSachSDDV();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa thông tin.',
              'error'
            )
          }
        });
      }
    })
  }

  navigateToPhongToa(){
    this.loaiDoiTuong = 2;
    this.colorPT = 'primary';
    this.colorSVCB = '';
    this.getDanhSachSDDV();
  }

  navigateToSVCB(){
    this.loaiDoiTuong = 1;
    this.colorPT = '';
    this.colorSVCB = 'primary';
    this.getDanhSachSDDV();
  }

}

