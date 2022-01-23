import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedTicketListComponent } from './booked-ticket-list.component';

describe('BookedTicketListComponent', () => {
  let component: BookedTicketListComponent;
  let fixture: ComponentFixture<BookedTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
