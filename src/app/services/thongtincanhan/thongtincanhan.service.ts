import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThongtincanhanService {

  constructor(private http: HttpClient) { }

  getThongTinCaNhan(obj: any):Observable<any>{
    console.log(environment.server_api);
    return this.http.post(environment.server_api + '/Account/GetUserInformation', obj);
  }
}
