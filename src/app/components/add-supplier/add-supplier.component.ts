import { Component, OnInit } from '@angular/core';
import { SupplierService} from '../../services/supplier.service';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss'],
})
export class AddSupplierComponent implements OnInit {
  supplier: Supplier = {
    id: '',
    nombre: '',
    correo: '',
    NIT: null,
    direccion: '',
    numero: null,
    password: '',
    count: ''
  };

  constructor(private supplierService: SupplierService, private authService: AuthService) { }

  ngOnInit() {

  }
  onSubmit(){
    if (this.supplier.nombre !== '' && this.supplier.correo !== ''){
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
