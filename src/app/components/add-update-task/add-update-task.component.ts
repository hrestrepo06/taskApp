import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ItemReorderEventDetail } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonLabel,
  IonButton,
  IonItem,
  IonIcon,
  IonRange,
  IonReorderGroup,
  IonReorder,
  IonCheckbox,
  IonButtons,
  IonFooter,
} from '@ionic/angular/standalone';

import { Item, Tasks } from 'src/app/models/task.models';
import { User } from 'src/app/models/user.models';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from '../header/header.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonButtons,
    IonCheckbox,
    IonReorder,
    IonReorderGroup,
    IonRange,
    IonIcon,
    IonItem,
    IonButton,
    IonLabel,
    IonContent,
    HeaderComponent,
    CustomInputComponent,
    NgIf,
    FormsModule,
  ],
})
export class AddUpdateTaskComponent implements OnInit {
  @Input() task: Tasks;
  user = {} as User;
  private utilSvc = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  constructor() {
    addIcons({ alertCircleOutline, checkmarkCircleOutline });
  }

  ngOnInit() {
    this.user = this.utilSvc.getElementFromLocalStorage('user');

    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
  }

  // ========== crea o actualiza tarea
  submit() {
    if (this.form.valid) {
      if (this.task) {
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  //  --------    Crear Tarea  ---------
  createTask() {
    let path = `users/${this.user.uid}`;

    this.utilSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.addToSubcollection(path, 'tasks', this.form.value).then(
      (res) => {
        this.utilSvc.dismissModal({ success: true });

        this.utilSvc.presentToast({
          message: 'Tarea creada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.utilSvc.dismissLoading();
      },
      (error) => {
        this.utilSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });

        this.utilSvc.dismissLoading();
      }
    );
  }

  //  --------    Editar Tarea  ---------
  updateTask() {
    let path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.utilSvc.presentLoading();
    delete this.form.value.id;

    this.firebaseSvc.updateDocument(path, this.form.value).then(
      (res) => {
        this.utilSvc.dismissModal({ success: true });

        this.utilSvc.presentToast({
          message: 'Tarea actualizada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.utilSvc.dismissLoading();
      },
      (error) => {
        this.utilSvc.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });

        this.utilSvc.dismissLoading();
      }
    );
  }

  getPercentage(): number {
    return this.utilSvc.getPercentage(this.form.value as Tasks);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }

  removeItem(index: number) {
    this.form.value.items.splice(index, 1);
    this.form.controls.items.updateValueAndValidity();
  }

  createItem() {
    this.utilSvc.presentAlert({
      header: 'Nueva actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: (res) => {
            let item: Item = { name: res.name, completed: false };
            this.form.value.items.push(item);
            this.form.controls.items.updateValueAndValidity();
          },
        },
      ],
    });
  }
}
