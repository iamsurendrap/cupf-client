import { TestBed } from '@angular/core/testing';

import { ScheduledmatchesService } from './scheduledmatches.service';

describe('ScheduledmatchesService', () => {
  let service: ScheduledmatchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledmatchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
