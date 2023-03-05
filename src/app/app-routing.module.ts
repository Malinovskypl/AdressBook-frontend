import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './com/add-contact/add-contact.component';
import { AdressBookComponent } from './com/adress-book/adress-book.component';
import { EditContactComponent } from './com/edit-contact/edit-contact.component';
import { UserResolver } from './_res/user.resolver';

const routes: Routes = [
  {path: 'home',component: AdressBookComponent},
  {path: 'add',component: AddContactComponent},
  {path: 'edit/:id',component: EditContactComponent, resolve: {contact: UserResolver}},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
