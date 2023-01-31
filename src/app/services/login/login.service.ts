import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(obj: any):Observable<any>{
    return this.http.post(environment.server_api + '/Account/Login', obj);
  }
  getUserInformation(obj: any){
    return this.http.post( environment.server_api + '/Account/GetUserInformation', obj);
  }
  getToa(maCanBo: any){
    return this.http.get(environment.server_api + '/Building/GetBuilding?MaCanBo=' + maCanBo);
  }
}
