import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Supplier} from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersCollection: AngularFirestoreCollection<Supplier>;
  suppliers: Observable<Supplier[]>;
  supplierDoc: AngularFirestoreDocument<Supplier>;
  constructor(public afs: AngularFirestore) {
  // this.suppliers = this.afs.collection('Proveedores').valueChanges();
  this.suppliersCollection = this.afs.collection('Proveedores', ref => ref.orderBy('nombre', 'asc'));
  this.suppliers = this.suppliersCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as any;
      data.id = a.payload.doc.id;
      return data;
    });
  }));

  }

  getSuppliers(){
    return this.suppliers;
  }

  addSupplier(supplier: Supplier){
      this.suppliersCollection.add(supplier);
  }
  deleteSupplier(supplier: Supplier){
    this.supplierDoc = this.afs.doc('Proveedores/$(supplier.id)');
    this.supplierDoc.delete();
  }
}
