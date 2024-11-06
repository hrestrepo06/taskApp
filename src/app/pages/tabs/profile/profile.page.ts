import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { addIcons } from 'ionicons';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.models';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class ProfilePage implements OnInit {
  private firebaseSvc = inject(FirebaseService);
  private utilSvc = inject(UtilsService);
  user = {} as User

  constructor() {
    addIcons({ logOutOutline, personCircleOutline });
  }

  ngOnInit() {}

/*
  signOut() {
    this.firebaseSvc.signOut();
  }
  */
  
  ionViewWillEnter() {
    this.getUser();
  }
  
  getUser() {
    return this.user = this.utilSvc.getElementFromLocalStorage('user');
  }
  
  signOut() {
    this.utilSvc.presentAlert({
        header: 'Cerrar Sesion',
        message: 'Quieres cerrar sesion?',
        mode: 'ios',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Si, cerrar',
            handler: () => {
              this.firebaseSvc.signOut();
            }
          }
        ]
      })
  }
}
