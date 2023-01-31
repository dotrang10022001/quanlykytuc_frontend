import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  role: string = "guest";
  constructor(private router: Router) {
    if (localStorage.getItem('role')) {
      let data = localStorage.getItem('role');
      if (data != null) this.role = data.toString();
    }
  }
  ngOnInit() {

  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    localStorage.removeItem('manguoidung');
    localStorage.removeItem('hoten');
    if(Number(localStorage.getItem('roleId')) == 2){
      localStorage.removeItem('maToa');
    }
    this.router.navigateByUrl('/login')
      .then(() => {
        window.location.reload();
      });
  }
}
