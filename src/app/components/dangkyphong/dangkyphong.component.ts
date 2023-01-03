import { Component } from '@angular/core';

@Component({
  selector: 'app-dangkyphong',
  templateUrl: './dangkyphong.component.html',
  styleUrls: ['./dangkyphong.component.css']
})
export class DangkyphongComponent {
  searchText: any;
  currentPage: number=1;
  itemsPerPage: number=14;

  dsDangKy: any=[];
  constructor (){
  }
}
