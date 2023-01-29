import { TestBed } from '@angular/core/testing';

import { PhongService } from './phong.service';

describe('PhongService', () => {
  let service: PhongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
