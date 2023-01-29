import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(obj: any):Observable<any>{
    return this.http.post('https://65.108.79.164:7201/api/services/app/Account/Login', obj);
  }
  getUserInformation(obj: any){
    return this.http.post('https://65.108.79.164:7201/api/services/app/Account/GetUserInformation', obj);
  }
  getToa(maCanBo: any){
    return this.http.get('https://65.108.79.164:7201/api/services/app/Building/GetBuilding?MaCanBo=' + maCanBo);
  }
}
