import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ForumService } from 'src/app/services/forum/forum.service';
import { S3Handler } from 'src/app/services/image/test';

@Component({
  selector: 'app-forum-dialog',
  templateUrl: './forum-dialog.component.html',
  styleUrls: ['./forum-dialog.component.css']
})
export class ForumDialogComponent {
  cbForm !: FormGroup;
  commentList: any=[
  ]
  searchText: any;
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  imageUrlPreview: string="../../../assets/images/canbo_upload/default.jpg";
  fileToUpload: any = null;
  constructor(private formBuilder: FormBuilder, private forumService: ForumService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<ForumDialogComponent>) {}

  ngOnInit():void{
    this.getDanhSachComment();

    if(this.data){
      if(this.data.data?.imageUrl){
        this.imageUrlPreview = 'https://friends-nhatnt.s3.amazonaws.com/toan/z3930039613342_195d2f2e257114f9aeb32b0067e63d9f.jpg';
      }
      console.log('data: ', this.data.data.id )
    }
  }

  getDanhSachComment(){
    this.forumService.getDanhSachForumComment(this.data.data.id).subscribe((res)=>{
      if(res.success){
        console.log('reshihi: ', res.data);
        this.commentList= res.data;
        // this.commentList = res
      }
      if(res.errors){
        Swal.fire({
          icon: 'error',
          title: 'Lấy danh sách cán bộ thất bại!',
        });
      }
    });
  }

  handleFileInput(event: any){
    this.fileToUpload = event.target.files.item(0);
    console.log('image to upload: ', this.fileToUpload);
    // this.s3Handler.upload('toan',this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  name: string='';
  handleUploadImage(event: any){

  }
}
