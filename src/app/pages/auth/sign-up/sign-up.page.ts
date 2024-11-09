
import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
 import { CustomValidators } from 'src/app/utils/custom-validators'
import { HeaderComponent } from 'src/app/components/header/header.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';

import { addIcons } from 'ionicons';
import { alertCircleOutline, checkmarkCircleOutline, lockClosedOutline, logInOutline, mailOutline, personAddOutline, personOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/models/user.models';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonContent,
  //  CommonModule,
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    NgIf
  ],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('',[Validators.required])
  });

 private firebaseSvc = inject(FirebaseService);
 private utilSvc = inject(UtilsService);
 private router = inject(Router);
  
  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      logInOutline,
      personAddOutline,
      personOutline,
      checkmarkCircleOutline,
      alertCircleOutline
    });
  }

  ngOnInit() {
    this.confirmPasswordValidator()
  }
  
  confirmPasswordValidator() {
    this.form.controls.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.form.controls.password)
    ])
    
    this.form.controls.confirmPassword.updateValueAndValidity();
  }
  
  
  submit(){
    if(this.form.valid) {
    
      this.utilSvc.presentLoading({message: 'Registrando...'})
      
      this.firebaseSvc.signUp(this.form.value as User).then(async res => {
        console.log(res);
        
        await this.firebaseSvc.updateUser({displayName: this.form.value.name})
        
        let user: User = {
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        
        this.utilSvc.setElementInLocalStorage('user',user);
        this.router.navigate(['/tabs/home']);
        
        this.utilSvc.dismissLoading();
        
        this.utilSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 1500,
          color: 'primary',
          icon: 'person-outline'
        })
        
        this.form.reset();
      }, error => {
        
        this.utilSvc.dismissLoading();
        this.utilSvc.presentToast({
          message: error,
          duration: 5000,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
        
      }
      )
    }
  }
  
}

