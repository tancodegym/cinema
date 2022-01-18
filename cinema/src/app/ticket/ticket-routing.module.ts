import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MovieSelectComponent} from './movie-select/movie-select.component';
import {SeatSelectComponent} from './seat-select/seat-select.component';


const routes: Routes = [
  {
    path: 'movie-select',
    component: MovieSelectComponent
  },
  {
    path: 'seat-select',
    component: SeatSelectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
