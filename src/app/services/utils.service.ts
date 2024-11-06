import { inject, Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ToastController, ToastOptions, AlertController, AlertOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController)
  private alertController = inject(AlertController)
  
  constructor() { }
  
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present();
  }
  
  async dismissLoading(){
    return await this.loadingController.dismiss();
  }
  
  // SET LOCAL
  setElementInLocalStorage(key: string, element: any){
    return localStorage.setItem(key, JSON.stringify(element))
  }
  
  // GET LOCAL
  getElementFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key));
  }
  
  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }
  
  // ============= Alert ================
  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertController.create(opts);
    
    await alert.present();
    }
}
