import { Component } from '@angular/core';

@Component({
  selector: 'app-phananh',
  templateUrl: './phananh.component.html',
  styleUrls: ['./phananh.component.css']
})
export class PhananhComponent {
  dsPhanAnh:any=[
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"}
  ];
  dsPhanAnhQL:any=[
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"", thoidiemphanhoi:""},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"},
    {masinhvien: '20194895', noidungphananh: "Vệ sinh bẩn", thoidiemphananh: "01-02-2022 8:30am", noidungphanhoi:"Sẽ liên hệ bên vệ sinh để xác nhận", thoidiemphanhoi:"01-02-2022 9:30am"}
  ];
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=14;
  constructor (){
  }
}
