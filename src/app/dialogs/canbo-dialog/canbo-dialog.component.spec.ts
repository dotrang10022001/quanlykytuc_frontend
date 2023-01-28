import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanboDialogComponent } from './canbo-dialog.component';

describe('CanboDialogComponent', () => {
  let component: CanboDialogComponent;
  let fixture: ComponentFixture<CanboDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanboDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanboDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
