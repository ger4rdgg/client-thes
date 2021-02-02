import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmailRequestsComponent } from './email/email-requests/email-requests.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { EmailCreateComponent } from './email/email-create/email-create.component';
import {ExternalConfigurationService} from './external-configuration-service';
import {NgxHalClientModule} from '@lagoshny/ngx-hal-client';
import {FormsModule} from '@angular/forms';
import { ImageUploaderComponent } from './image/image-uploader/image-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    EmailRequestsComponent,
    NavbarComponent,
    EmailCreateComponent,
    ImageUploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxHalClientModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
