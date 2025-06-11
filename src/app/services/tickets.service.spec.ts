import { TestBed } from '@angular/core/testing';

import { TicketsService } from './tickets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(TicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
