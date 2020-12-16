import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Manager } from '../models/manager';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public manager$: Observable<Manager>;
  private managerID: string;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.manager$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.managerID = user.uid;
          return this.afs.doc<Manager>(`Administradores/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async register(manager: Manager): Promise<User> {
    try {
      const newmanager = {...manager};
      console.log('Supplier0' , manager);
      const { user } = await this.afAuth.createUserWithEmailAndPassword(manager.correo, manager.contrasena);
      this.registerManagerData(user, newmanager);
      console.log('N Manager' , newmanager);
      // await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.managerID = user.uid;
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private registerManagerData(user: User, manager: Manager) {
    const managerRef: AngularFirestoreDocument<Manager> = this.afs.doc(`Administradores/${user.uid}`);

    const data: Manager = {
      nombre: manager.nombre,
      correo: manager.correo,
      contrasena: ''
    };

    return managerRef.set(data, { merge: true });
  }

  getManagerId(): string{
    console.log(this.managerID);
    return this.managerID;
  }

  loginProveedor(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  RegisterProveedor(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential>{
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logOutProveedor(): Promise<void>{
    return firebase.auth().signOut();
  }
}
