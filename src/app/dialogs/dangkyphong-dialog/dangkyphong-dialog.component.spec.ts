import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkyphongDialogComponent } from './dangkyphong-dialog.component';

describe('DangkyphongDialogComponent', () => {
  let component: DangkyphongDialogComponent;
  let fixture: ComponentFixture<DangkyphongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkyphongDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangkyphongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
