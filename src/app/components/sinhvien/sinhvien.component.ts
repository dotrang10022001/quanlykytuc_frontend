import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SinhvienDialogComponent } from 'src/app/dialogs/sinhvien-dialog/sinhvien-dialog.component';
import { SinhvienService } from 'src/app/services/sinhvien/sinhvien.service';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SinhVien } from 'src/app/models/sinhvien.model';

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css']
})
export class SinhvienComponent{
  public loading = false;
  displayedColumns: string[] = ['masinhvien', 'hoten', 'gioitinh', 'ngaysinh', 'sodienthoai', 'email', 'hanhdong'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private svService: SinhvienService){

  }
  ngOnInit(){
    this.loading = true;
    this.getDanhSachSinhVien();
  }

  getDanhSachSinhVien(){
    this.svService.getDanhSachSinhVien().subscribe((res)=>{
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
          title: 'Lấy danh sách sinh viên thất bại!',
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
    this.dialog.open(SinhvienDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDanhSachSinhVien();
      }
    });
  }

  xemSinhVien(row: any){
    this.dialog.open(SinhvienDialogComponent, {
      width: '40%',
      height: '85%',
      data: {data: row, type: 'view'}
    });
  }

  suaSinhVien(row: any){
    this.dialog.open(SinhvienDialogComponent,{
      width: '40%',
      height: '85%',
      data: {data: row, type: 'edit'}
    }).afterClosed().subscribe((val)=>{
      if(val === 'Cập nhật'){
        this.getDanhSachSinhVien();
      }
    });
  }

  xoaSinhVien(row: any){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa sinh viên này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.svService.xoaSinhVien(row.id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Sinh viên bạn chọn đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDanhSachSinhVien();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa sinh viên.',
              'error'
            )
          }
        });
      }
    })
  }

}

