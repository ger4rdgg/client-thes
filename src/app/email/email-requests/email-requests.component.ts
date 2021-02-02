import { Component, OnInit } from '@angular/core';
import {EmailRequest} from '../email';
import {Router} from '@angular/router';
import {EmailService} from '../email.service';

@Component({
  selector: 'app-email-requests',
  templateUrl: './email-requests.component.html',
  styleUrls: ['./email-requests.component.css']
})
export class EmailRequestsComponent implements OnInit {

  public emailRequests: EmailRequest[] = [];
  constructor(public router: Router,
              private emailService: EmailService

              ) { }

  ngOnInit(): void {
    this.emailService.getAll().subscribe((emailRequests) => this.emailRequests = emailRequests);
  }
}
