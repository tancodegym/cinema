import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserCreateComponent} from "./user-create/user-create.component";


const routes: Routes = [
  {
    path: 'create',
    component: UserCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
