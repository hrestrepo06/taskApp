import { inject, Injectable } from '@angular/core';

import { LoadingController, LoadingOptions, ToastController, 
         ToastOptions, AlertController, AlertOptions, 
         ModalOptions, ModalController} 
from '@ionic/angular';

import { Tasks } from '../models/task.models';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private loadingController = inject(LoadingController);
  private toastController = inject(ToastController)
  private alertController = inject(AlertController)
  private modalController = inject(ModalController)
  
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
    
  // ============ Modal =============
  // PRESENT

  async presentModal(opts: ModalOptions) {
  /*
      const modal = await this.modalController.create(opts);
      await modal.present();
      
      const {data} = await modal.onWillDismiss();
     
      if (data) {
         return data;
      }
      */
      
      try {
        const modal = await this.modalController.create(opts);
        await modal.present();
        
        const { data } = await modal.onWillDismiss();
        return data || null;  // Devuelve `null` si no hay datos
      } catch (error) {
        console.error('Error al presentar el modal:', error);
        return null;
      }
      
    }
    
  // DISMISS
  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }
  
  getPercentage(task: Tasks){
    let completedItems = task.items.filter(item => item.completed).length;
    let totalItems = task.items.length;
    let percentage = (100 / totalItems) * completedItems
    
    return Math.round(percentage);
  }
  
}
