import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongDialogComponent } from './phong-dialog.component';

describe('PhongDialogComponent', () => {
  let component: PhongDialogComponent;
  let fixture: ComponentFixture<PhongDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhongDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
