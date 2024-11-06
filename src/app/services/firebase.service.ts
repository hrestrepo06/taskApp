import { inject, Injectable } from '@angular/core';

import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, UserCredential } from '@angular/fire/auth';
import { User } from '../models/user.models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  
  constructor() { }
  
  login(user: User){
    return signInWithEmailAndPassword(this.auth, user.email,user.password);
  }
  
  // signUp(user: User)
  signUp(user: User): Promise<UserCredential>{
    
    return createUserWithEmailAndPassword(this.auth, user.email,user.password)
      /*.then((userCredential: UserCredential ) => {
        return userCredential
      })
      .catch((error) => {
        throw error;
      });*/
  }
  
  
  //updateUser(user: any){
  //async updateUser(user: Partial<Pick<User, 'displayName' | 'photoURL'>>): Promise<void> {
    async updateUser(user: { displayName?: string; photoURL?: string }): Promise<void> {  
      const auth = getAuth();
      const currentUser = auth.currentUser
      
      if (currentUser) {
        return updateProfile(currentUser, user);
      } else {
        return Promise.reject('No hay usuario autenticado')
      }
      
  }
  
  getAuthState(): Observable<any>{
    return authState(this.auth);
  }
  
  
  async signOut(){
    await this.auth.signOut();
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
  }
  
}
