import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import { CanboDialogComponent } from 'src/app/dialogs/canbo-dialog/canbo-dialog.component';

@Component({
  selector: 'app-canbo',
  templateUrl: './canbo.component.html',
  styleUrls: ['./canbo.component.css']
})
export class CanboComponent{
  displayedColumns: string[] = ['macanbo', 'anh', 'hoten', 'gioitinh', 'ngaysinh', 'chucvu', 'hanhdong'];
  dataSource!: MatTableDataSource<any>;
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private cbService: CanboService){

  }
  ngOnInit(){
    this.loading = true;
    this.getDanhSachCanBo();
  }

  getDanhSachCanBo(){
    this.cbService.getDanhSachCanBo().subscribe((res)=>{
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
          title: 'Lấy danh sách cán bộ thất bại!',
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
    this.dialog.open(CanboDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDanhSachCanBo();
      }
    });
  }

  xemCanBo(row: any){
    this.dialog.open(CanboDialogComponent, {
      width: '40%',
      height: '85%',
      data: {data: row, type: 'view'}
    });
  }

  suaCanBo(row: any){
    this.dialog.open(CanboDialogComponent,{
      width: '40%',
      height: '85%',
      data: {data: row, type: 'edit'}
    }).afterClosed().subscribe((val)=>{
      if(val === 'Cập nhật'){
        this.getDanhSachCanBo();
      }
    });
  }

  xoaCanBo(row: any){
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa cán bộ này?',
      text: "Bạn sẽ không thể hoàn tác. Hãy cẩn thận.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      confirmButtonText: 'Xóa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cbService.xoaCanBo(row.id).subscribe((res)=>{
          if(res){
            Swal.fire(
              'Đã xóa',
              'Cán bộ bạn chọn đã được xóa.',
              'success'
            ).then((result)=>{
              this.getDanhSachCanBo();
            });
          }
          error: ()=>{
            Swal.fire(
              'Lỗi xảy ra khi xóa cán bộ.',
              'error'
            )
          }
        });
      }
    })
  }

}

