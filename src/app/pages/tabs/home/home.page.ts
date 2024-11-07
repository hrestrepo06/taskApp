import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
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
import { eyeOutline, trashOutline } from 'ionicons/icons';

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
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    TaskProgressComponent,
  ],
})
export class HomePage implements OnInit {
  tasks: Tasks[] = [
    {
      id: '1',
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
        { name: 'Actividad 2', completed: false },
        { name: 'Actividad 3', completed: false },
      ],
    },
  ];

  constructor() {
    addIcons({eyeOutline,trashOutline})
  }

  ngOnInit() {}
}
