import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiphongDialogComponent } from './loaiphong-dialog.component';

describe('LoaiphongDialogComponent', () => {
  let component: LoaiphongDialogComponent;
  let fixture: ComponentFixture<LoaiphongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiphongDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaiphongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
