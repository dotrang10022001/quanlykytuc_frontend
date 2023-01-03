import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhananhComponent } from './phananh.component';

describe('PhananhComponent', () => {
  let component: PhananhComponent;
  let fixture: ComponentFixture<PhananhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhananhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhananhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
