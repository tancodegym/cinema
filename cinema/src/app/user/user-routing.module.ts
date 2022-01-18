import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';

// import {AuthAdminGuard} from '../security/auth.admin.guard';

// import {EditComponent} from './edit/edit.component';

// import {AuthGuard} from '../security/auth.guard';



const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
  },
  // {
  //   path: 'edit/:id',
  //   component: EditComponent,
  // },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
