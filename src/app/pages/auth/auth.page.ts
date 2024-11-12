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

import { HeaderComponent } from 'src/app/components/header/header.component';
import { LogoComponent } from 'src/app/components/logo/logo.component';
import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';

import { addIcons } from 'ionicons';
import { lockClosedOutline, logInOutline, mailOutline, personAddOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonContent,
    HeaderComponent,
    LogoComponent,
    CustomInputComponent,
    RouterLink,
    NgIf
  ],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  
  private firebaseSvc = inject(FirebaseService);
  private utilSvc = inject(UtilsService);
  private router = inject(Router);

  constructor() {
    addIcons({
      mailOutline,
      lockClosedOutline,
      logInOutline,
      personAddOutline
    });
  }

  ngOnInit() {}
  
  submit(){
    if(this.form.valid) {
    
      this.utilSvc.presentLoading({message: 'Autenticando...'})
      
      this.firebaseSvc.login(this.form.value as User).then(async res => {
        console.log(res);
        
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
