import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DichvuDialogComponent } from './dichvu-dialog.component';

describe('DichvuDialogComponent', () => {
  let component: DichvuDialogComponent;
  let fixture: ComponentFixture<DichvuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DichvuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DichvuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
