import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import {Supplier} from '../models/supplier';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.page.html',
  styleUrls: ['./supplier.page.scss'],
})
export class SupplierPage implements OnInit {

  suppliers: Supplier[]

  constructor(private supplierService: SupplierService) { }

  ngOnInit() {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      console.log(suppliers);
      this.suppliers = suppliers;
    });
  }

  deleteSupplier(event, supplier)
  {
    this.supplierService.deleteSupplier(supplier);
  }

}
