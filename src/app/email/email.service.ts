import {Injectable, Injector} from '@angular/core';
import {RestService} from '@lagoshny/ngx-hal-client';
import {EmailRequest} from './email';

@Injectable({
  providedIn: 'root'
})

export class EmailService extends RestService<EmailRequest>{
  constructor(injector: Injector) {
    super(EmailRequest, 'emailRequests', injector);
  }

}
