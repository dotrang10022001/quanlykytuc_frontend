import { Component, ViewChild } from '@angular/core';
import { Sinhvien } from 'src/app/models/sinhvien.model';
import { SinhvienService } from 'src/app/services/sinhvien/sinhvien.service';

@Component({
  selector: 'app-sinhvien',
  templateUrl: './sinhvien.component.html',
  styleUrls: ['./sinhvien.component.css']
})
export class SinhvienComponent{

  dsSinhVien: Sinhvien[]=[
    {masinhvien: '123', hoten: 'Nguyen An', sodienthoai: '01235', gioitinh: 'Nam', ngaysinh: new Date('10-05-2001'), email: '123@gmail.com', khoa: 'Khoa hoc may tinh', vien: 'cntt va tt', lop: 'it1-06', hotencha: 'Nguyen A', hotenme: 'Nguyen B', noithuongtru: 'abc', anh: 'sv1.jpg'},

  ]
  
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=5;

  constructor(private svService: SinhvienService){
    
  }
  
  xemSinhVien(masinhvien: string){
    console.log(masinhvien);
  }

}
