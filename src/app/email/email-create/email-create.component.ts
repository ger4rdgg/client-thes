import { Component, OnInit } from '@angular/core';
import {EmailRequest} from '../email';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailService} from '../email.service';
import {Location} from '@angular/common';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {UploadedImage} from '../../image/uploaded-image';
import {UploadFileService} from '../../image/file-upload.service';
import {ImageService} from '../../image/image-service.service';

const profileImageUploadUrl = 'http://localhost:8080/email/image';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  currentFileUpload: UploadedImage;
  changeImage = false;
  clicked = false;
  imageError: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private httpClient: HttpClient,
              private emailService: EmailService,
              private uploadService: UploadFileService,
              private imageService: ImageService) { }

  public email: EmailRequest;
  submitted = false;

  ngOnInit(): void {
    this.email = new EmailRequest();
  }
  change($event): void {
    this.changeImage = true;
  }

  upload(): void {
    this.clicked = true;

    this.uploadService.pushFileToStorage(this.currentFileUpload.file, profileImageUploadUrl, this.email)
      .subscribe(event => this.handleEvent(event),
        err => this.handleError(err));
  }

  handleEvent(event: HttpEvent<{}>): void {
    if (event instanceof HttpResponse) {
      const body = event.body;
      this.handleResponse(body);
    }

    this.currentFileUpload = undefined;
  }

  handleResponse(data: any): void {
    console.log(data);
    this.currentFileUpload = undefined;
    this.clicked = false;
  }

  handleError(err: Error): void {
    console.error('Error is', err);
    this.imageError = err.message;
    this.clicked = false;
  }

  onUploadedImage(image: UploadedImage): void {
    this.imageError = this.imageService.validateImage(image);

    if (!this.imageError) {
      this.currentFileUpload = image;
    }
  }

  onSubmit(): void {
    this.emailService.create(this.email).subscribe(result => {
      this.router.navigate(['/emailRequests']);
    }, error => console.error(error));
  }

  onCancel(): void {
    this.location.back();
  }


}
