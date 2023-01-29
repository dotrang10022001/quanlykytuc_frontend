import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudungdichvuDialogComponent } from './sudungdichvu-dialog.component';

describe('SudungdichvuDialogComponent', () => {
  let component: SudungdichvuDialogComponent;
  let fixture: ComponentFixture<SudungdichvuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudungdichvuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudungdichvuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
