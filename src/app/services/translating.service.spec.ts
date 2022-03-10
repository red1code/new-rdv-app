import { TestBed } from '@angular/core/testing';

import { TranslatingService } from './translating.service';

describe('TranslatingService', () => {
  let service: TranslatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
