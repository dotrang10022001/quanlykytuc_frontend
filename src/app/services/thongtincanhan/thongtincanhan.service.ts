import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ThongtincanhanService {

  constructor(private http: HttpClient) { }

  getThongTinCaNhan(obj: any):Observable<any>{
    return this.http.post('https://65.108.79.164:7201/api/services/app/Account/GetUserInformation', obj);
  }
}
