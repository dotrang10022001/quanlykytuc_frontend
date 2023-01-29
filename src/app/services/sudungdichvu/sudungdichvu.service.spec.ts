import { TestBed } from '@angular/core/testing';

import { SudungdichvuService } from './sudungdichvu.service';

describe('SudungdichvuService', () => {
  let service: SudungdichvuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudungdichvuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
