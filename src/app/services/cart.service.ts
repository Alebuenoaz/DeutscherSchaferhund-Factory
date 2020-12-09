import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartsCollection: AngularFirestoreCollection<Cart>;
  carts: Observable<Cart[]>;
  cartDoc: AngularFirestoreDocument<Cart>;
  constructor(public afs: AngularFirestore) {
    // this.Carts = this.afs.collection('Proveedores').valueChanges();
  this.cartsCollection = this.afs.collection('Carritos');
  this.carts = this.cartsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as any;
      data.id = a.payload.doc.id;
      return data;
    });
  }));
  }

  private data = [
    {
      Descripcion: 'descrpcion',
      Img: 'img',
      Producto: 'producto',
      Cantidad: 'cantidad'
    }
  ];

  private cart = [];

  // constructor() { }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    return this.cart.push(product);
  }

  addProductDB(cart: Cart){
    this.cartsCollection.add(cart);
  }

  getCartsDB(){
    return this.carts;
  }
}
