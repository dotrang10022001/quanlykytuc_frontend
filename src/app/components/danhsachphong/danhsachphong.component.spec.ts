import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachPhongComponent } from './danhsachphong.component';

describe('DanhSachPhongComponent', () => {
  let component: DanhSachPhongComponent;
  let fixture: ComponentFixture<DanhSachPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhSachPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhSachPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
