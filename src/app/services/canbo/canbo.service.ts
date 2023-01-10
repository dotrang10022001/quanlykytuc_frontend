import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Canbo } from 'src/app/models/canbo.model';

@Injectable({
  providedIn: 'root'
})
export class CanboService {
  private baseUrl = 'https://localhost:7200/api/services/app';

  constructor(private http: HttpClient) { }

  getDanhSachCB(): Observable<Canbo[]>{
    return this.http.get<Canbo[]>(this.baseUrl+"/CanBo/GetCanBo");
  }

  xemCanBo(id: number){
    return this.http.get<Canbo>(this.baseUrl+"/CanBo/GetCanBo?Id="+id);
  }

  themCanBo(canbo: Canbo){
    return this.http.post(this.baseUrl+"/CanBo/CreateOrUpdateCanBo", canbo);
  }

}
