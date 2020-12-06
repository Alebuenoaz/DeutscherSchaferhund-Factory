import { Component, OnInit } from '@angular/core';
import { SupplierService} from '../../services/supplier.service';
import { Supplier} from '../../models/supplier';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  supplier: Supplier = {
    nombre: '',
    correo: '',
    NIT: null,
    direccion: '',
    numero: null
  }

  constructor(private supplierService: SupplierService, private authService:AuthService) { }

  ngOnInit() {
    
  }
  onSubmit(){
    if(this.supplier.nombre != '' && this.supplier.correo != ''){
      this.supplierService.addSupplier(this.supplier);
      this.authService.RegisterProveedor(this.supplier.correo, this.supplier.password);
      this.supplier.nombre = '';
      this.supplier.correo = '';
      this.supplier.numero = null;
      this.supplier.NIT = null;
      this.supplier.direccion = '';
    }
  }

}
