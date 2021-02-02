import { Component, ViewEncapsulation, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {UploadedImage} from '../uploaded-image';
import {ImageService} from '../image-service.service';


@Component({
  selector: 'app-image-uploader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  public image: any;

  @Output() uploadedImage = new EventEmitter<UploadedImage>();
  @ViewChild('input') inputFile: ElementRef;

  constructor(private imageService: ImageService) { }

  fileChange(input): void {
    const reader = new FileReader();
    const uploadImage = {} as UploadedImage;

    if (input.files.length) {
      const file = input.files[0];
      uploadImage.file = file;

      const emitter = this.uploadedImage;

      reader.onload = (event) => {
        const img = new Image();

        // tslint:disable-next-line:only-arrow-functions typedef
        img.onload = function(scope) {
          uploadImage.height = img.height;
          uploadImage.width = img.width;

          emitter.emit(uploadImage);
        };

        img.src = (event.target.result as string);
        this.image = reader.result;
      };

      if (this.imageService.validExtension(uploadImage)) {
        reader.readAsDataURL(file);
      } else {
        emitter.emit(uploadImage);
        this.removeImage();
      }
    }
  }

  removeImage(): void{
    this.image = '';
  }

  // tslint:disable-next-line:typedef
  clickFileInput() {
    const el: HTMLElement = this.inputFile.nativeElement;
    el.click();
  }
}
