import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookedTicketListComponent} from "./booked-ticket-list/booked-ticket-list.component";


const routes: Routes = [
  {
    path: 'list',
    component: BookedTicketListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookedTicketRoutingModule { }
