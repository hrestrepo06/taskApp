import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import {
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    IonButtons,
    IonButton,
    IonIcon,
    IonItem,
    IonInput,
    IonLabel,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() icon: string;
  @Input() type: string;
  @Input() autocomplete: string;

  isPassword: boolean;
  hide: boolean = true;

  constructor() {
    addIcons({eyeOutline, eyeOffOutline})
  }

  ngOnInit() {
    if (this.type == 'password') this.isPassword = true;
  }
  
  showOrHidePassword() {
    this.hide = !this.hide;
    if(this.hide){
      this.type = 'password';
    } else {
      this.type = 'text';
    }
  }
  
  
}
