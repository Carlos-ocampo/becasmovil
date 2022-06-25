import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiservService } from 'src/app/services/apiserv.service';

@Component({
  selector: 'app-manage-uni',
  templateUrl: './manage-uni.component.html',
  styleUrls: ['./manage-uni.component.scss'],
})
export class ManageUniComponent implements OnInit {
  id: string;
  name: string;
  descripcion: string;
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
        .getUniById(this.id)
        .then((response) => {
          this.name = response['nombre'];
          this.descripcion = response['descripcion'];
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
      { nombre: this.name, descripcion: this.descripcion },
      'confirm'
    );
  }

  async deleteUni() {
    const alert = await this.alertController.create({
      header: 'Cuidado!!',
      message: `Desea <strong>Eliminar</strong> La universidad <em>${this.name}</em>?`,
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
