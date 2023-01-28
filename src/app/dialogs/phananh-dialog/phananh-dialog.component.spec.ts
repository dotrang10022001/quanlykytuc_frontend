import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhananhDialogComponent } from './phananh-dialog.component';

describe('PhananhDialogComponent', () => {
  let component: PhananhDialogComponent;
  let fixture: ComponentFixture<PhananhDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhananhDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhananhDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
