import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import { Supplier } from '../models/supplier';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {

  suppliers: any[];
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

    /*const suppliersO$ = this.supplierService.getSuppliers();
    const cartsO$ = this.cartService.getCartsDB();

    const supCart$ = combineLatest([suppliersO$, cartsO$])
      .pipe(
        take(1),
        map(results => {
        this.suppliers = results[0];
        this.carts = results[1];
        console.log(this.carts);
        this.countSuppliers();
      })
      );
    */


    // this.countSuppliers();
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
    const selected = [];
    const countedProviders = [];
    const carts = this.carts;
    const suppliers = this.suppliersDB;

    for (const cart of carts) {
      if (selected[cart.idProveedor]) {
        selected[cart.idProveedor].count++;
        selected[cart.idProveedor].total += this.totalOfCart(cart);
      }else {
        selected[cart.idProveedor] = {count: 0, total: 0};
        selected[cart.idProveedor].count = 1; // {...cart, count: 1};
        selected[cart.idProveedor].total = this.totalOfCart(cart);
      }
    }

    console.log('selected');
    console.log(selected);

    for (const prov of suppliers) {
      if (selected[prov.id]) {
        prov.data.count = selected[prov.id].count;
        prov.data.total = selected[prov.id].total;
      }else {
        prov.data.count = 0;
        prov.data.total = 0;
      }
    }
    console.log('suppliersDB');
    console.log(suppliers);

    return suppliers;
    // countedProviders = Object.keys(selected).map(key => selected[key]);

    // this.suppliers.map(supplier => ({...supplier, count}))
  }

  totalOfCart(cart: Cart){
    return cart.insumos
    .map(insumo => ( parseInt(insumo.cantidad, 10) * parseInt(insumo.precioUnitario, 10)))
    .reduce((a, b) => a + b, 0);
  }

  selectedChange($event) {
    const suppliersC = this.countSuppliers();
    this.suppliers = suppliersC
      .map(element => (element.data));
    console.log($event.target.value);
    if ($event.target.value === 'number') {
      this.suppliers.sort((a, b) => (a.count < b.count) ? 1 : -1);
      // console.log('suppliersSorted');
      // console.log(this.suppliersDB);
    }
    if ($event.target.value === 'name') {
      this.suppliers.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    }
    if ($event.target.value === 'total') {
      this.suppliers.sort((a, b) => (a.total > b.total) ? -1 : 1);
      console.log('sortedT', this.suppliers);
    }
}

}
