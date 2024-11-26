import { Injectable } from '@angular/core';
import { AngularToastService } from 'angular-toasts';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toast: AngularToastService) {}

  public showWarningToast(text: string) {
    this.toast.warning('Advertencia', text);
  }

  public showErrorToast(text: string) {
    this.toast.error('Error', text);
  }

  public showInfoToast(text: string) {
    this.toast.info('Información:', text);
  }

  public showMessageUntilResponse(){
    this.toast.showToast('Loading data...','','info',{timeOut:'0'});
  }

}