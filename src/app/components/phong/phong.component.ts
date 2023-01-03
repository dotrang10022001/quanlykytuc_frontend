import { Component } from '@angular/core';

@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.css']
})
export class PhongComponent {

  dsPhong: any=[
    {sophong: 101, maloaiphong: 'cobannuB3'}, 
    {sophong: 102, maloaiphong: 'cobannamB3'},
    {sophong: 103, maloaiphong: 'cobannuB3'},
    {sophong: 104, maloaiphong: 'cobannamB3'},
    {sophong: 105, maloaiphong: 'cobannuB3'},
    {sophong: 106, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'},
    {sophong: 107, maloaiphong: 'cobannuB3'}
  ]
  dsMaLoaiPhong: any=[
    {maloaiphong: 'cobannamB3'},
    {maloaiphong: 'cobannuB3'}
  ]
  dsSinhVien: any=[
    {masinhvien:20194156, hoten: 'Nguyễn Thị Mai'},
    {masinhvien:20194156, hoten: 'Nguyễn Thị Mai'},
    {masinhvien:20194178, hoten: 'Nguyễn Thị Mai'},
    {masinhvien:20194156, hoten: 'Nguyễn Thị Mai'}
  ]

  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=24;
  constructor (){
  }

}
