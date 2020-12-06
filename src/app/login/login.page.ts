import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService:AuthService, private router:Router, private alertCtrl:AlertController) { }

  ngOnInit() {
  }

  async loginProveedor(form):Promise<void>{
    //this.router.navigateByUrl('home');
    this.authService.loginProveedor(form.value.email, form.value.pass).then(
      ()=>{
        this.router.navigateByUrl('home');
      },
      async error =>{
        const alert= await this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok',role:'cancel'}],
        });
        await alert.present();
      }
    );
  }

}
