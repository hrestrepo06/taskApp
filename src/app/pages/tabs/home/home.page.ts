import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonButton,
  IonIcon,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { Tasks } from '../../../models/task.models';

import { TaskProgressComponent } from '../../../components/taskProgress/taskProgress.component';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  createOutline,
  eyeOutline,
  trashOutline,
} from 'ionicons/icons';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/components/add-update-task/add-update-task.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonIcon,
    IonButton,
    IonCard,
    IonRow,
    IonCol,
    IonGrid,
    IonContent,
    CommonModule,
    HeaderComponent,
    TaskProgressComponent,
  ],
})
export class HomePage implements OnInit {
  private utilsSvc = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);
  user = {} as User;
  loading: boolean = false;

  tasks: Tasks[] = [];
  items: Tasks[] = [];

  constructor() {
    addIcons({ eyeOutline, trashOutline, addCircleOutline, createOutline, alertCircleOutline, checkmarkCircleOutline});
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getTask();
    this.getUser();
  }

  getUser() {
    return (this.user = this.utilsSvc.getElementFromLocalStorage('user'));
  }

  getPercentage(task: Tasks): number {
    return this.utilsSvc.getPercentage(task);
  }

  async addOrUpdateTask(task?: Tasks) {
    let res = await this.utilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal',
    });

    if (res && res.success) {
      this.getTask();
    }
  }

  /*
  getTask(){
    let user: User = this.utilsSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}`;
    
    /*
    this.firebaseSvc.getSubcollection(path,'tasks').subscribe({
      next: (res) => {
        console.log(res);
      }
    })
    

  }*/

  async getTask() {
    //let user: User = this.utilsSvc.getElementFromLocalStorage('user');
    
    let user = this.getUser();
    let path = `users/${user.uid}/tasks`;

    try {
      this.loading = true;
      this.items = await this.firebaseSvc.getSubcollection(path);
      this.tasks = this.items;
      console.log(this.tasks);
      this.loading = false;
    } catch (error) {
      console.error('Error fetching subcollection:', error);
    }
  }

  confirmDeleteTask(task: Tasks) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Tarea',
      message: 'Quieres eliminar esta tarea?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteTask(task);
          },
        },
      ],
    });
  }

  deleteTask(task: Tasks) {
    let path = `users/${this.user.uid}/tasks/${task.id}`;

    this.utilsSvc.presentLoading();

    this.firebaseSvc.deleteDocument(path).then(
      (res) => {
        this.utilsSvc.presentToast({
          message: 'Tarea eliminada exitosamente',
          color: 'success',
          icon: 'alert-circle-outline',
          duration: 1500,
        });
        this.getTask();
        this.utilsSvc.dismissLoading();
      },
      (error) => {
        this.utilsSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'checkmark-circle-outline',
          duration: 5000,
        });

        this.utilsSvc.dismissLoading();
      }
    );
  }
}
