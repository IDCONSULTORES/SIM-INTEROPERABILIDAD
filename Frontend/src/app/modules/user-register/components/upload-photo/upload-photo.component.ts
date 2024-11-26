import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      const name = file.name;
      this.singleFileForm.patchValue({ name, file });
    }
  }

  singleFileForm: FormGroup;
  imageUrl: string = '';

  @Output()
  saveImage = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
    this.singleFileForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  resetData() {
    this.singleFileForm.reset();
    this.imageUrl = '';
  }

  openFileExplorer() {
    document.getElementById('file-input')?.click();
  }

  newImageSelected(event: { file: File; name: string }) {
    console.log(event);
    const reader = new FileReader();
    reader.readAsDataURL(event.file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
  }

  changeFileName(event: any) {
    if (!event?.target?.files) return;
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const name = file.name;
      this.singleFileForm.patchValue({ name, file });
      this.newImageSelected({ file, name });
    }
  }

  saveForm() {
    if (this.singleFileForm.valid)
      this.saveImage.emit(this.singleFileForm.value);
  }
}
