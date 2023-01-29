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
import { CreateForumDialogComponent } from 'src/app/dialogs/create-forum-dialog/create-forum-dialog.component';
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

  constructor(public dialog: MatDialog,private forumService: ForumService){

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
    this.dialog.open(CreateForumDialogComponent, {
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
}
