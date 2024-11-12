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
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { Tasks } from '../../../models/task.models';

import { TaskProgressComponent } from '../../../components/taskProgress/taskProgress.component';
import { addIcons } from 'ionicons';
import { addCircleOutline, eyeOutline, trashOutline } from 'ionicons/icons';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/components/add-update-task/add-update-task.component';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
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

  tasks: Tasks[] = [];
  items: Tasks[] = [];
  //items: { id: string; }[];
  //items: Tasks[] = [];
  
   /* {
      id: '1',
      title: 'Autenticacion con Google',
      description:
        'Crear una funcion que permita autenticar al usuario con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: true },
      ],
    },
    {
      id: '2',
      title: 'Autenticacion con Google',
      description:
        'Crear una funcion que permita autenticar al usuario con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: false },
        { name: 'Actividad 3', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Autenticacion con Google',
      description:
        'Crear una funcion que permita autenticar al usuario con google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: false },
      ],
    },
  ];
  */

  constructor() {
   addIcons({eyeOutline,trashOutline, addCircleOutline})
  }

  ngOnInit() {

  }
  
  ionViewWillEnter() {
    this.getTask();
  }
  
  getPercentage(task: Tasks): number{
    return this.utilsSvc.getPercentage(task);
  }
  
  addOrUpdateTask(task?: Tasks){
    this.utilsSvc.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: {task},
      cssClass: 'add-update-modal'
    })
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
     
    try {
      this.items =  await this.firebaseSvc.getSubcollection();
      this.tasks = this.items
      
    } catch (error) {
      console.error('Error fetching subcollection:', error);
    }
  }

}
