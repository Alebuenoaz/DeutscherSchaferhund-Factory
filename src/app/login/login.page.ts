import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async loginProveedor(form): Promise<void>{
    this.authService.loginProveedor(form.value.email, form.value.pass).then(
      () => {
        this.router.navigateByUrl('pending');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'ok', role: 'cancel'}],
        });
        await alert.present();
      }
    );
  }
  resetPassword(email): void{
    this.authService.resetPassword(email).then(
      () => {
        this.router.navigateByUrl('login');
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'ok', role: 'cancel'}],
        });
        await alert.present();
      }
    );
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Ingrese su correo',
      subHeader: 'se le enviara un correo para recuperar su contraseña',
      inputs: [
        {
          name: 'email',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigateByUrl('login');
          }
        }, {
          text: 'Ok',
          handler: async () => {
            console.log('Confirmado');
            const result = await alert.onDidDismiss();
            console.log(result.data.values.email);
            this.resetPassword(result.data.values.email);
            this.router.navigateByUrl('login');
          }
        }
      ]
    });

    await alert.present();
  }

}
