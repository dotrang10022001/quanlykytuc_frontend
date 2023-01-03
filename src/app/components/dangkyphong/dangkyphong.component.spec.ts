import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyphongComponent } from './dangkyphong.component';

describe('DangkyphongComponent', () => {
  let component: DangkyphongComponent;
  let fixture: ComponentFixture<DangkyphongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkyphongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangkyphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
