import { Component } from '@angular/core';

@Component({
  selector: 'app-loaiphong',
  templateUrl: './loaiphong.component.html',
  styleUrls: ['./loaiphong.component.css']
})
export class LoaiphongComponent {

  dsLoaiPhong: any=[
    {maloaiphong: 'cobannuB3', tenloaiphong: 'Cơ bản-Nữ', mota: 'Phòng có giường, tủ cá nhân, nhà vệ sinh khép kín, tiền phòng đã bao gồm tiền nước',
  succhua: 8, doituong: 'Nữ', giaphong: 1400000, anh: 'lp1.jpg', toa: 'B3'},
  {maloaiphong: 'cobannamB9', tenloaiphong: 'Cơ bản-Nam', mota: 'Phòng có giường, tủ cá nhân, nhà vệ sinh khép kín, tiền phòng đã bao gồm tiền nước',
  succhua: 8, doituong: 'Nam', giaphong: 1400000, anh: 'lp2.jpg', toa: 'B9'},
  {maloaiphong: 'cobannamB6', tenloaiphong: 'Cơ bản-Nam', mota: 'Phòng có giường, tủ cá nhân, nhà vệ sinh khép kín, tiền phòng đã bao gồm tiền nước',
  succhua: 8, doituong: 'Nam', giaphong: 1400000, anh: 'lp2.jpg', toa: 'B6'},
  {maloaiphong: 'cobannamB3', tenloaiphong: 'Cơ bản-Nam', mota: 'Phòng có giường, tủ cá nhân, nhà vệ sinh khép kín, tiền phòng đã bao gồm tiền nước',
  succhua: 8, doituong: 'Nam', giaphong: 1400000, anh: 'lp2.jpg', toa: 'B3'},
  {maloaiphong: 'cobannamB10', tenloaiphong: 'Cơ bản-Nam', mota: 'Phòng có giường, tủ cá nhân, nhà vệ sinh khép kín, tiền phòng đã bao gồm tiền nước',
  succhua: 8, doituong: 'Nam', giaphong: 1400000, anh: 'lp2.jpg', toa: 'B10'},

  ]

  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=4;
  total: any;
  constructor (){
    this.total = this.dsLoaiPhong.length;
  }

}
