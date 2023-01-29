import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { S3Handler } from 'src/app/services/image/test';
import { Forum } from 'src/app/models/forum.model';
import { ForumService } from 'src/app/services/forum/forum.service';

@Component({
  selector: 'app-create-forum-dialog',
  templateUrl: './create-forum-dialog.component.html',
  styleUrls: ['./create-forum-dialog.component.css']
})
export class CreateForumDialogComponent {
  public loading = false;
  frForm !: FormGroup;
  forum: Forum={
    id: 0, posterName: '', posterRoleId:1, posterRole: 'student', forumTitle: '', forumCaption: '', imageUrl: null, state: 1, type:1, creationTime: ''
  }
  isReadonlyEdit: string="false";
  isReadonlyView: string="false";
  actionBtn: string="Thêm";
  imageUrlPreview: string="../../../assets/images/canbo_upload/default.jpg";
  fileToUpload: any = null;
  imageUrlS3: any = null;
  constructor(private formBuilder: FormBuilder, private forumService: ForumService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any , private dialogRef: MatDialogRef<CreateForumDialogComponent>) {}

  ngOnInit():void{
    this.frForm = this.formBuilder.group({
      posterName: ['', Validators.required],
      forumTitle: ['', Validators.required],
      forumCaption: ['', Validators.required],
      anh: ['', Validators.required],
    });
    this.isReadonlyEdit = "false";
    this.isReadonlyView = "false";
  }

  async handleFileInput(event: any){
    this.fileToUpload = event.target.files.item(0);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  async handleUploadFileToS3(file: any) : Promise<string>{
    var res = await this.s3Handler.upload('toan', file);
    console.log('res location s3: ', res.Location);
    return res.Location;
  }
  name: string='';

  async createNewForum(){
    if(this.fileToUpload==null){
      Swal.fire({
        icon: 'error',
        title: 'Chưa chọn ảnh hoặc ảnh không hợp lệ.',
        text: 'Vui lòng chọn lại file ảnh *'
      });
    }else{
      this.loading = true;
      var imageUrl = await this.handleUploadFileToS3(this.fileToUpload);
      this.forum.id = 0;
      if(this.frForm.valid){
        this.forum.posterName = this.frForm.value.posterName;
        this.forum.forumTitle = this.frForm.value.forumTitle;
        this.forum.forumCaption = this.frForm.value.forumCaption;
        this.forum.imageUrl = imageUrl != null ? imageUrl : 'default.jpg';
        this.forum.creationTime = new Date().toISOString();
        this.forumService.themHoacSuaForum(this.forum).subscribe((res: any)=>{
          if(res.success){
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: ' Tạo bài viết thành công!',
            }).then((result)=>{
              this.frForm.reset();
              this.dialogRef.close(this.actionBtn);
            });
          }
          if(res.errors){
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: ' Tạo bài viết thất bại!',
            });
          }
        });
      }else{
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Dữ liệu nhập vào không hợp lệ.',
          text: 'Làm ơn kiểm tra lại, chú ý các trường bắt buộc có dấu *'
        });
      }
    }
    this.loading = false;
  }
}
