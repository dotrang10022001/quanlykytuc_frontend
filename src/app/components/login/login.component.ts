import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: '',
  }
  constructor(private loginService: LoginService, private router: Router) {

  }

  onLogin() {
    if (this.loginObj.username == '' || this.loginObj.password == '') {
      Swal.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại!',
        text: 'Tên đăng nhập và mật khẩu không được bỏ trống!',
      }).then((result) => {
        this.router.navigateByUrl("/login");
      });
    } else {
      this.loginService.onLogin(this.loginObj).subscribe((res: any) => {
        if (res.success && res.data.isActive) {
          Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
          }).then((result) => {
            localStorage.setItem('role', res.data.role);
            localStorage.setItem('roleId', res.data.roleId);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            this.loginService.getUserInformation({ roleId: res.data.roleId, userId: res.data.userId }).subscribe((rs: any) => {
              if (rs.success) {
                localStorage.setItem('manguoidung', res.data.roleId == 3 ? rs.data.maSinhVien : rs.data.maCanBo);
                if (res.data.roleId == 2) {
                  this.loginService.getToa(rs.data.maCanBo).subscribe((r: any) => {
                    if (r.success) {
                      localStorage.setItem('maToa', r.data[0].maToa);
                      this.router.navigateByUrl('/trangchu')
                        .then(() => {
                          window.location.reload();
                        });
                    }
                  });
                } else {
                  this.router.navigateByUrl('/trangchu')
                    .then(() => {
                      window.location.reload();
                    });
                }
              }
            });
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Đăng nhập thất bại!',
            text: 'Tên đăng nhập/mật khẩu không chính xác. Hãy nhập lại!',
          }).then((result) => {
            this.router.navigateByUrl("/login");
          });
        }
      });
    }
  }

}

