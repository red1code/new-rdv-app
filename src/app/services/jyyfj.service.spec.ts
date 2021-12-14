import { TestBed } from '@angular/core/testing';

import { JyyfjService } from './jyyfj.service';

describe('JyyfjService', () => {
  let service: JyyfjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JyyfjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
