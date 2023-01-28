import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinhvienDialogComponent } from './sinhvien-dialog.component';

describe('SinhvienDialogComponent', () => {
  let component: SinhvienDialogComponent;
  let fixture: ComponentFixture<SinhvienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinhvienDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinhvienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
