import { NgClass, NgIf } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  IonTitle,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { closeCircleOutline, sunnyOutline, moonOutline } from 'ionicons/icons';

import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonBackButton,
    IonButtons,
    IonTitle,
    IonHeader,
    IonToolbar,
    NgClass,
    NgIf,
  ],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() color!: string;
  @Input() centerTitle!: Boolean;

  darkMode: BehaviorSubject<boolean>;
  themeSvc = inject(ThemeService);
  utilSvc = inject(UtilsService);

  constructor() {
    addIcons({
      closeCircleOutline,
      sunnyOutline,
      moonOutline,
    });
  }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode;
  }

  dismissModal(){
    this.utilSvc.dismissModal();
  }
  
  setTheme(darkMode: boolean) {
    this.themeSvc.setTheme(darkMode);
  }
}
