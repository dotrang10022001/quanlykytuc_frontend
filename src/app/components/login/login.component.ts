import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any={
    userName: '',
    password: ''
  }
  constructor (private loginService: LoginService){

  }

  onLogin(){
    this.loginService.onLogin(this.loginObj).subscribe((res: any)=>{
      console.log('res', res);
    });
  }
  
}

