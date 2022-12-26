import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanboComponent } from './canbo.component';

describe('CanboComponent', () => {
  let component: CanboComponent;
  let fixture: ComponentFixture<CanboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
