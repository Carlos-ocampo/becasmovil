import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiservService } from 'src/app/services/apiserv.service';

@Component({
  selector: 'app-edit-pais',
  templateUrl: './edit-pais.component.html',
  styleUrls: ['./edit-pais.component.scss'],
})
export class EditPaisComponent implements OnInit {
  id: string;
  name: string;
  emoji: string;
  updateStatus: boolean;
  tituloAccion: '';

  constructor(
    private modalCtrl: ModalController,
    private apiserv: ApiservService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    if (this.id) {
      this.apiserv
        .getPaisById(this.id)
        .then((response) => {
          this.name = response['nombre'];
          this.emoji = response['emoji'];
        })
        .catch((error) => {
          console.log('error', error);
          this.cancel();
        });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(
      { nombre: this.name, emoji: this.emoji },
      'confirm'
    );
  }

  async deleteCountry() {
    const alert = await this.alertController.create({
      header: 'Cuidado!!',
      message: `Desea <strong>Eliminar</strong> el pais ${this.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Confirmar',
          role: 'delete',
        }
      ]
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    return this.modalCtrl.dismiss({id:this.id}, role);
  }
}
