import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiphongComponent } from './loaiphong.component';

describe('LoaiphongComponent', () => {
  let component: LoaiphongComponent;
  let fixture: ComponentFixture<LoaiphongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaiphongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaiphongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
