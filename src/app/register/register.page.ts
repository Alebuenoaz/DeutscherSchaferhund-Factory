import { Component, OnInit } from '@angular/core';
import { Manager} from '../models/manager';
import { ManagerService} from '../services/manager.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  manager: Manager = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private managerService: ManagerService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(){
    if (this.manager.email !== '' && this.manager.password !== ''){
      this.authService.register(this.manager).then(() => {
        this.manager.name = '';
        this.manager.email = '';
        this.manager.password = '';
        this.router.navigateByUrl('supplier');
      });
      // this.managerService.addManager(this.manager);
      // this.authService.RegisterProveedor(this.manager.correo, this.manager.password);
    }
  }

}
