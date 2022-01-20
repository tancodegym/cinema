import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatsRoutingModule } from './stats-routing.module';
import { MoviesStatsComponent } from './movies-stats/movies-stats.component';
import { UserStatsComponent } from './user-stats/user-stats.component';
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [MoviesStatsComponent, UserStatsComponent],
  imports: [
    CommonModule,
    StatsRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class StatsModule { }
