import {Resource} from '@lagoshny/ngx-hal-client';

export class EmailRequest extends Resource {

  id: number;
  subject: string;
  body: string;
  sender: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
