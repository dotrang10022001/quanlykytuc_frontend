import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(obj: any):Observable<any>{
    return this.http.post('http://65.108.79.164:7200/api/services/app/Account/Login', obj);
  }
}
