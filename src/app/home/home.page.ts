import { Component, OnInit } from '@angular/core';

// Import AngularFirestore to make Queries.
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';

export interface Data {
  movies: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  tableStyle = 'material';
  doc: any;
  tasks: any = [];
  Tareas: any = [{
    id: '',
    data: {} as Cart
   }];

   sliderConfig = {
     spaceBetween: 2,
     // centeredSlides: true,
     slidesPerView: 4
   };
   cart = [];

  constructor(
    private firestore: AngularFirestore,
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(){
    this.getProducts();
    this.cart = this.cartService.getCart();
  }

  getProducts() {
    this.firestore.collection('/Carritos').snapshotChanges().subscribe(res => {
      this.Tareas = [];
      res.forEach(task => {
        this.Tareas.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
      console.log(this.Tareas);
    });
  }

  update_status(recordID, newStatus) {
    console.log('ID del Pedido: ' + recordID);
    this.firestore.doc('Carritos/' + recordID).update({estado: newStatus});
    this.getProducts();
  }
  
}
