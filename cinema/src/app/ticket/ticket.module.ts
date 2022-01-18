import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { MovieSelectComponent } from './movie-select/movie-select.component';
import { SeatSelectComponent } from './seat-select/seat-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [MovieSelectComponent, SeatSelectComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TicketModule { }
