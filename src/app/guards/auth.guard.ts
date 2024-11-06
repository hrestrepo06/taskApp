import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { map, tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const firebaseSvc = inject(FirebaseService);
  const router = inject(Router);
  
  return firebaseSvc.getAuthState().pipe(
    map(user => !!user),          // Verifica si el usuario esta autenticado
    tap(isAutheticated => {
        if (!isAutheticated) {
          router.navigate(['/auth']);  // Redirige a login si no esta autenticado
        }                             
      }
  ))
}

    