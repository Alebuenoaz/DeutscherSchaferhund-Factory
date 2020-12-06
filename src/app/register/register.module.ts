import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { SuppliersComponent} from  '../components/suppliers/suppliers.component';
import { NavbarComponent} from  '../components/navbar/navbar.component';
import { AddSupplierComponent} from  '../components/add-supplier/add-supplier.component';
import { SupplierService} from  '../services/supplier.service'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule
  ],
  declarations: [RegisterPage,SuppliersComponent,NavbarComponent,AddSupplierComponent],
  providers: [SupplierService]
})
export class RegisterPageModule {}
