import { TestBed } from '@angular/core/testing';

import { DangkyphongService } from './dangkyphong.service';

describe('DangkyphongService', () => {
  let service: DangkyphongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangkyphongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
