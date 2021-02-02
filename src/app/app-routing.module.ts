import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailRequestsComponent} from './email/email-requests/email-requests.component';
import {NavbarComponent} from './navbar/navbar.component';
import {EmailCreateComponent} from './email/email-create/email-create.component';

const routes: Routes = [
  { path: '', component: NavbarComponent },
  { path: 'emailRequests', component: EmailRequestsComponent },
  { path: 'createEmail', component: EmailCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
