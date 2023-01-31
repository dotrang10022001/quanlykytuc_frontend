import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Canbo } from 'src/app/models/canbo.model';
import { CanboService } from 'src/app/services/canbo/canbo.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { S3Handler } from 'src/app/services/image/aws-bucket.service';
import { Forum } from 'src/app/models/forum.model';
import { ForumService } from 'src/app/services/forum/forum.service';
import { AccountModel } from 'src/app/models/account.model';
import { UpdateAccount } from 'src/app/models/update-account.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'admin-account-forum-dialog',
  templateUrl: './admin-account-dialog.component.html',
  styleUrls: ['./admin-account-dialog.component.css'],
})
export class AdminAccountDialogComponent {
  public loading = false;
  acForm!: FormGroup;
  forum: Forum = {
    id: 0,
    posterName: '',
    posterRoleId: 1,
    posterRole: 'student',
    forumTitle: '',
    forumCaption: '',
    imageUrl: null,
    state: 1,
    type: 1,
    creationTime: '',
  };
  account: UpdateAccount = {
    userName: '',
    newPassword: '',
    isActive: true,
  };
  actionBtn: string = 'Thêm';
  imageUrlPreview: string = '../../../assets/images/canbo_upload/default.jpg';
  fileToUpload: any = null;
  imageUrlS3: any = null;
  updateData: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private s3Handler: S3Handler,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AdminAccountDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log('hihi: ', this.data);
    // this.updateData = this.data.data;
    // console.log('hihi1: ', this.updateData);
    this.acForm = this.formBuilder.group({
      newPassword: [''],
      roleID: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  async handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    var reader = new FileReader();
    reader.onload = (evt: any) => {
      this.imageUrlPreview = evt.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  async handleUploadFileToS3(file: any): Promise<string> {
    var res = await this.s3Handler.upload('toan', file);
    console.log('res location s3: ', res.Location);
    return res.Location;
  }
  name: string = '';

  async suaTaiKhoan() {
    this.loading = true;
    this.account.userName = this.data.data.tendangnhap;
    console.log('check: ', this.account);
    if (this.acForm.valid) {
      this.account.newPassword = this.acForm.value.newPassword;
      this.account.isActive = this.acForm.value.state =="true"? true: false;
      console.log('check1: ', this.account);
      this.adminService
      .suaTaiKhoan(this.account)
      .subscribe((res: any) => {
        if (res.success) {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: ' Sửa tài khoản thành công!',
          }).then((result) => {
            this.acForm.reset();
            this.dialogRef.close(this.actionBtn);
          });
        }
        if (res.errors) {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: ' Sửa tài khoản thất bại!',
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

    this.loading = false;
  }
}
