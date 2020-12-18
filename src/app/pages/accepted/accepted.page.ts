import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Insumo } from 'src/app/models/insumo';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.page.html',
  styleUrls: ['./accepted.page.scss'],
})
export class AcceptedPage implements OnInit {

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
    private firestore: AngularFirestore
  ) {
    
  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts() {
    this.firestore.collection('/Carritos').snapshotChanges().subscribe(res => {
      this.Tareas = [];
      res.forEach(task => {
        this.Tareas.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
    });
  }

  update_status(cart, newStatus) {
    console.log('ID del Pedido: ' + cart.id);
    this.firestore.doc('Carritos/' + cart.id).update({estado: newStatus});
    this.getProducts();
    //Update stock in firestore
    cart.data.insumos.forEach(product => {
      this.addStock(product.codigoInsumo, product.cantidad);
    });
  }

  async addStock(productID, addedStock){
    var currentStock = 0;
    /*this.firestore.collection('Insumos').doc(productID).snapshotChanges().subscribe(
      async res => { 
        console.log("AQUIIII " + res.payload.data()['stock']);
        currentStock = await res.payload.data()['stock'];
        this.firestore.doc('Insumos/' + productID).update({stock: newStock});
      });*/
    await this.firestore.collection('Insumos').doc(productID).valueChanges().subscribe(
      async res => {
        //console.log("STOCK ACTUALLLLLL " + res['stock']);
        currentStock = await res['stock'];
      }
    );
    console.log("Stock Actual: " + currentStock);
    console.log("Stock Para Añadir: " + addedStock);  
    var newStock = currentStock + addedStock;
    console.log("Nuevo Stock: " + newStock);
    this.firestore.doc('Insumos/' + productID).update({stock: newStock});
  }

}
