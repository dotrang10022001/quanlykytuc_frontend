import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CanboService {
  private baseUrl = 'http://localhost:7200/';

  constructor(private http: HttpClient) { }

  getListCanBo(){
    return this.http.get(this.baseUrl+"canbo");
  }
}
