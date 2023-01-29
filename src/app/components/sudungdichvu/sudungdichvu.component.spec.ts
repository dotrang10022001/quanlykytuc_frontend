import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudungdichvuComponent } from './sudungdichvu.component';

describe('SudungdichvuComponent', () => {
  let component: SudungdichvuComponent;
  let fixture: ComponentFixture<SudungdichvuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudungdichvuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudungdichvuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
