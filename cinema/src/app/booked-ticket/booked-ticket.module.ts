import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookedTicketRoutingModule } from './booked-ticket-routing.module';
import { BookedTicketListComponent } from './booked-ticket-list/booked-ticket-list.component';


@NgModule({
  declarations: [BookedTicketListComponent],
  imports: [
    CommonModule,
    BookedTicketRoutingModule
  ]
})
export class BookedTicketModule { }
