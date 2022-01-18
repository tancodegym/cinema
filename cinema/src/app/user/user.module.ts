import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ListComponent} from './list/list.component';

// import {EditComponent} from './edit/edit.component';
// @ts-ignore
// import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';


@NgModule({
  declarations: [ListComponent],
  exports: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule {
}
