import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // Router => LoginModule TânTN //
  {
    path: 'auth',
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  // Router => user SangDN//
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },

  {
    path: 'bookedticket',
    loadChildren: () => import('./booked-ticket/booked-ticket.module').then(module => module.BookedTicketModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
