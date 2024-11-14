import { inject, Injectable } from '@angular/core';

import { Auth, authState, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, 
updateProfile, UserCredential } from '@angular/fire/auth';

import { Firestore, collection, collectionGroup, getDocs, query, where, addDoc, updateDoc, doc, deleteDoc} from '@angular/fire/firestore';

import { User } from '../models/user.models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './utils.service';
import { Tasks } from '../models/task.models';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private db = inject(Firestore);
  private utilsSvc = inject(UtilsService);
  
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
  
  async getSubcollection(): Promise<Tasks[]>{
    
    let user: User = this.utilsSvc.getElementFromLocalStorage('user');
    let path = `users/${user.uid}`;
 
    const subcollectionRef = collection(this.db, `${path}/tasks`);
    
    // Obtener los documentos de la subcolección
    const snapshot = await getDocs(subcollectionRef);
    
    // Mapea los datos y los devuelve
    return snapshot.docs.map(doc => {
      const data = doc.data();
      
      return {
        id: doc.id,
        title: data['title'] ||  'Titulo...',
        description: data['description'] || 'Descripcion...',
        items: data['items'] || []
      } as Tasks;
      
    });
  }
  

  async addToSubcollection(path: string, subcollection: string, object: any): Promise<void> {
    
    try {
      const tasksCollection = collection(this.db, `${path}/${subcollection}`);

      await addDoc(tasksCollection, object);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }
  
  async updateDocument(path: string, object: any): Promise<void> {
    try {
      // Crea una referencia al documento específico en la subcolección `task`
      const taskDocRef = doc(this.db, `${path}`);
      await updateDoc(taskDocRef, object);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
  
  async deleteDocument(path: string): Promise<void> {
    try {
      // Crea una referencia al documento específico en la subcolección `task`
      const taskDocRef = doc(this.db, `${path}`);
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }
  
}
