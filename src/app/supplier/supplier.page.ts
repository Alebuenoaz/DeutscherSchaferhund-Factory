import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import {Supplier} from '../models/supplier';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {

  suppliers: Supplier[];
  carts: Cart[];
  selected: string;
  suppliersDB: any = [{
    id: '',
    data: {} as Cart
   }];

  constructor(
    private firestore: AngularFirestore,
    private supplierService: SupplierService,
    private cartService: CartService
    ) {}

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      console.log(suppliers);
      this.suppliers = suppliers;
    });

    this.cartService.getCartsDB().subscribe(carts => {
      console.log(carts);
      this.carts = carts;
    });

    //this.countSuppliers();
    this.getSuppliers();
  }

  getSuppliers() {
    this.firestore.collection('/Proveedores').snapshotChanges().subscribe(res => {
      this.suppliersDB = [];
      res.forEach(task => {
        this.suppliersDB.push({ id: task.payload.doc.id, data: task.payload.doc.data() });
      });
      console.log(this.suppliersDB);
    });
  }

  countSuppliers(){
    let selected = [];
    let countedProviders = [];
    let carts = this.carts;
    let suppliers = this.suppliersDB;

    for (let obj of carts) {
      if (selected[obj.idProveedor]) {
        selected[obj.idProveedor]++;//.count++;
      }else {
        selected[obj.idProveedor] = 1;//{...obj, count: 1};
      }
    }

    console.log('selected');
    console.log(selected);

    for (let prov of suppliers) {
      if (selected[prov.id]) {
        prov.data.count = selected[prov.id];
      }else {
        prov.data.count = 0;
      }
    }
    console.log('suppliersDB');
    console.log(suppliers);

    suppliers.sort((a, b) => (a.data.count < b.data.count) ? 1 : -1);
    console.log('suppliersSorted');
    console.log(this.suppliersDB);
    //countedProviders = Object.keys(selected).map(key => selected[key]);

    //this.suppliers.map(supplier => ({...supplier, count}))
  }

  selectedChange($event) {
    console.log($event.target.value);
    if ($event.target.value === 'number') {
      this.countSuppliers();
      this.suppliers = this.suppliersDB
      .map(element => (element.data));
    }
    if ($event.target.value === 'name') {
      this.suppliers.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    }
}

}
