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
} from '@ionic/angular/standalone';

import { Item, Tasks } from 'src/app/models/task.models';
import { User } from 'src/app/models/user.models';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from '../header/header.component';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
  standalone: true,
  imports: [
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

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  constructor() {}

  ngOnInit() {
    this.user = this.utilSvc.getElementFromLocalStorage('user');

    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
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
    this.form.updateValueAndValidity();
  }
  
  createItem(){
    this.utilSvc.presentAlert({
      header: 'Nueva actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Agregar',
          handler: (res) => {
            
            let item: Item = {name: res.name, completed: false};
            this.form.value.items.push(item);
            this.form.updateValueAndValidity();
          }
        }
      ]
    })
  }
  
}
