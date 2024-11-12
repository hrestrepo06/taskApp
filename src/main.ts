import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
 
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';

import { environment} from 'src/environments/environment'

import { NgCircleProgressModule } from 'ng-circle-progress';
import { importProvidersFrom } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { setupConfig } from '@ionic/core';

setupConfig({
  mode: 'md',
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    
    importProvidersFrom(NgCircleProgressModule.forRoot({
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animation: true,
      animationDuration: 300,
    })),
    ModalController,
  ],
}).catch(err => console.error(err));





