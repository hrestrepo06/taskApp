import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  IonContent
} from '@ionic/angular/standalone';

import { Tasks } from 'src/app/models/task.models';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { HeaderComponent } from "../header/header.component";
import { CustomInputComponent } from "../custom-input/custom-input.component";

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
  standalone: true,
  imports: [IonContent, HeaderComponent, CustomInputComponent,CommonModule]
})

export class AddUpdateTaskComponent  implements OnInit {
  
  @Input() task: Tasks
  user = {} as User
  private utilSvc = inject(UtilsService);
  private firebaseSvc = inject(FirebaseService);
  
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('',[Validators.required, Validators.minLength(4)]),
    description: new FormControl('',[Validators.required, Validators.minLength(4)]),
    items: new FormControl([],[Validators.required, Validators.minLength(1)]),
  })
  
  constructor() { }

  ngOnInit() {
    this.user = this.utilSvc.getElementFromLocalStorage('user');
    
    if(this.task){
      this.form.setValue(this.task);
      this.form.updateValueAndValidity()
    }
  }

}
