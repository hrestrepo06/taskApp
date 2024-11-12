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

  tasks: Tasks[] = [
    {
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

  constructor() {
   addIcons({eyeOutline,trashOutline, addCircleOutline})
  }

  ngOnInit() {
    this.addOrUpdateTask(this.tasks[0]);
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
  
  
}
