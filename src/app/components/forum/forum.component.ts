import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import { CanboDialogComponent } from 'src/app/dialogs/canbo-dialog/canbo-dialog.component';
import { ForumDialogComponent } from 'src/app/dialogs/forum-dialog/forum-dialog.component';
import { ForumService } from 'src/app/services/forum/forum.service';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  displayedColumns: string[] = ['nguoidang','tieude','anh', 'sophanhoi', 'ngaytao', 'hanhdong'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private forumService: ForumService){

  }
  ngOnInit(){
    this.getDanhSachCanBo();
  }

  getDanhSachCanBo(){
    this.forumService.getDanhSachForum().subscribe((res)=>{
      if(res.success){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      if(res.errors){
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
    this.dialog.open(ForumDialogComponent, {
      width: '40%',
      height: '85%'
    }).afterClosed().subscribe((val)=>{
      if(val === 'Thêm'){
        this.getDanhSachCanBo();
      }
    });
  }

  xemCanBo(row: any){
    this.dialog.open(ForumDialogComponent, {
      width: '40%',
      height: '85%',
      data: {data: row, type: 'view'}
    });
  }

  suaCanBo(row: any){
    this.dialog.open(ForumDialogComponent,{
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
        this.forumService.xoaForum(row.id).subscribe((res)=>{
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
