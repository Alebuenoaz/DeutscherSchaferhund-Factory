import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.page.html',
  styleUrls: ['./submit-form.page.scss'],
})
export class SubmitFormPage implements OnInit {


  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get phone() {
    return this.registrationForm.get('phone');
  }
  get contentDesc() {
    return this.registrationForm.get('description.contentDesc');
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'Debe poner el nombre del encargado' },
      { type: 'maxlength', message: 'No debe exceder los 100 caracteres' }
    ],
    email: [
      { type: 'required', message: 'Debe poner el email del encargado' },
      { type: 'pattern', message: 'Porfavor ingrese una direccion de email valida' }
    ],
    phone: [
      { type: 'required', message: 'Debe poner el telefono del encargado' },
      { type: 'pattern', message: 'Porfavor ingrese un telefono valido' }
    ],
    contentDesc: [
      { type: 'required', message: 'Debe poner una descripcion para cada item de la oferta' },
      { type: 'maxlength', message: 'No debe exceder los 300 caracteres' }
    ],
  };

  registrationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    phone: ['', [
      Validators.required,
      Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
    ]],
    description: this.formBuilder.group({
      contentDesc: ['', [Validators.required, Validators.maxLength(300)]]
    })
  });

  selectedItems = [];
  total = 0;

  constructor(private formBuilder: FormBuilder, private cartService: CartService) { }

  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};

    for (let obj of items) {
      if (selected[obj.id]) {
        selected[obj.id].count++;
      }else {
        selected[obj.id] = {...obj, count: 1};
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key]);
    console.log('items: ', this.selectedItems);
    this.total = this.selectedItems.reduce((a, b) => + (b.data.count * b.data.price), 0);
  }

  public submit() {
    console.log(this.registrationForm.value);
    this.cartService.addProductDB(
      {
        estado: 'Pendiente',
        nombreEncargado: this.registrationForm.value.name,
        telefonoEncargado: this.registrationForm.value.phone,
        emailEncargado: this.registrationForm.value.email,
        descripcion: this.registrationForm.value.description.contentDesc,
        productos: this.cartService.getCart().map(product => product.data.Producto)
      }
    );
  }
}
