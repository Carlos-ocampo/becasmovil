import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ApiservService } from '../services/apiserv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public alertController: AlertController,
    public apiserv: ApiservService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.apiserv.getUserTokenSetted() != '') {
      this.router.navigate(['/home']);
    }
  }

  ionViewWillEnter() {
    if (this.apiserv.getUserTokenSetted() != '') {
      this.router.navigate(['/home']);
    }
  }

  async onSubmit(f: NgForm) {
    if (!f.valid) {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: '',
        message:
          '<strong>Ha ocurrido un error con el formulario</strong><br> Por favor, revise todos los campos',
        buttons: ['Dale'],
      });

      await alert.present();
      return;
    }

    this.apiserv
      .getUserToken({ username: f.value.username, password: f.value.passwrd })
      .then((data) => {
        this.apiserv.setUserToken(data['token']);
        // this.apiserv.setUserToken(data.token);
        // this.navCtrl.navigateBack('/home');
        this.router.navigate(['/home']);
      })
      .catch(async (error) => {
        const alert = await this.alertController.create({
          header: 'Error :C',
          subHeader: '',
          message:
            '<strong>Error con las credennciales</strong><br> Por favor, revise todos sus crdenciales',
          buttons: ['Dale'],
        });

        await alert.present();
      });
  }
}
