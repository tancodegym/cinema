import { TestBed } from '@angular/core/testing';

import { BookedTicketService } from './booked-ticket.service';

describe('BookedTicketService', () => {
  let service: BookedTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookedTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
