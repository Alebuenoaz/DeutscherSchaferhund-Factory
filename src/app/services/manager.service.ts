import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  managersCollection: AngularFirestoreCollection<Manager>;
  managers: Observable<Manager[]>;
  managerDoc: AngularFirestoreDocument<Manager>;
  constructor(public afs: AngularFirestore) {
  // this.Managers = this.afs.collection('ProveeAdministradoresdores').valueChanges();
  this.managersCollection = this.afs.collection('Administradores', ref => ref.orderBy('nombre', 'asc'));
  this.managers = this.managersCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as any;
      data.id = a.payload.doc.id;
      return data;
    });
  }));

  }

  getManagers(){
    return this.managers;
  }

  getManagersDB(){
    return this.managersCollection;
  }

  addManager(manager: Manager){
      this.managersCollection.add(manager);
  }
  deleteManager(manager: Manager){
    this.managerDoc = this.afs.doc('Administradores/$(Manager.id)');
    this.managerDoc.delete();
  }
}
