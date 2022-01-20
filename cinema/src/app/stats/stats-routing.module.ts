import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MoviesStatsComponent} from "./movies-stats/movies-stats.component";
import {UserStatsComponent} from "./user-stats/user-stats.component";


const routes: Routes = [
  {path:'movie',component:MoviesStatsComponent},
  {path:'user',component:UserStatsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsRoutingModule { }
