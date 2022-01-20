import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // Router => LoginModule TânTN //
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.module').then(module => module.StatsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
