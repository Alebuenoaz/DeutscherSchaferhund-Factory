import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-finalized',
  templateUrl: './finalized.page.html',
  styleUrls: ['./finalized.page.scss'],
})
export class FinalizedPage implements OnInit {

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
      console.log(this.Tareas);
    });
  }

  update_status(recordID, newStatus) {
    console.log('ID del Pedido: ' + recordID);
    this.firestore.doc('Carritos/' + recordID).update({estado: newStatus});
    this.getProducts();
  }

}
