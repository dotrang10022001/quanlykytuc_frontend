import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForumService } from 'src/app/services/forum/forum.service';
import { S3Handler } from 'src/app/services/image/test';
import { ForumComment } from 'src/app/models/forum-comment.model';

@Component({
  selector: 'app-forum-dialog',
  templateUrl: './forum-dialog.component.html',
  styleUrls: ['./forum-dialog.component.css'],
})
export class ForumDialogComponent {
  public loading = false;
  fcForm!: FormGroup;
  commentList: any = [];
  forumComment: ForumComment = {
    id: 0,
    commentName: '',
    commentContent: '',
    creationTime: '',
    forumId: 0,
  };
  searchText: any;
  isReadonlyEdit: string = 'false';
  isReadonlyView: string = 'false';
  actionBtn: string = 'Thêm';
  imageUrlPreview: string = '../../../assets/images/canbo_upload/default.jpg';
  fileToUpload: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private forumService: ForumService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ForumDialogComponent>
  ) {}

  ngOnInit(): void {
    this.fcForm = this.formBuilder.group({
      anh: [''],
      commentName: ['', Validators.required],
      commentContent: ['', Validators.required],
    });
    this.getDanhSachComment();

    if (this.data) {
      if (this.data.data?.imageUrl) {
        this.imageUrlPreview = this.data.data.imageUrl;
      }
      console.log('data: ', this.data.data.id);
    }
  }

  getDanhSachComment() {
    this.forumService
      .getDanhSachForumComment(this.data.data.id)
      .subscribe((res) => {
        if (res.success) {
          console.log('reshihi: ', res.data);
          this.commentList = res.data;
          // this.commentList = res
        }
        if (res.errors) {
          Swal.fire({
            icon: 'error',
            title: 'Lấy danh sách cán bộ thất bại!',
          });
        }
      });
  }
  createNewComment() {
    this.loading = true;
    this.forumComment.id = 0;
    console.log(this.fcForm);
    if (this.fcForm.valid) {
      this.forumComment.commentName = this.fcForm.value.commentName;
      this.forumComment.commentContent = this.fcForm.value.commentContent;
      this.forumComment.forumId = this.data.data.id;
      this.forumComment.creationTime = new Date().toISOString();
      this.forumService
        .createForumComment(this.forumComment)
        .subscribe((res: any) => {
          if (res.success) {
            this.loading = false;
            Swal.fire({
              icon: 'success',
              title: ' Tạo bình luận bài viết thành công!',
            }).then((result) => {
              this.fcForm.reset();
              this.dialogRef.close(this.actionBtn);
            });
          }
          if (res.errors) {
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: ' Tạo bài bình luận viết thất bại!',
            });
          }
        });
    } else {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Dữ liệu nhập vào không hợp lệ.',
        text: 'Làm ơn kiểm tra lại, chú ý các trường bắt buộc có dấu *',
      });
    }
    this.loading = true;
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log('image to upload: ', this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  name: string = '';
  handleUploadImage(event: any) {}
}
