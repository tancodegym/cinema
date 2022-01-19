import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ListComponent} from './list/list.component';


// @ts-ignore
// import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {EditComponent} from './edit/edit.component';


@NgModule({
  declarations: [ListComponent, EditComponent],
  exports: [
    ListComponent,
    EditComponent
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
