import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiservService } from 'src/app/services/apiserv.service';

@Component({
  selector: 'app-manage-becas',
  templateUrl: './manage-becas.component.html',
  styleUrls: ['./manage-becas.component.scss'],
})
export class ManageBecasComponent implements OnInit {
  id: string;
  name: string;
  porcentaje: number;
  requisitos: '';
  categoria: string;
  pais: string;
  universidad: string;

  updateStatus: boolean;
  tituloAccion: '';

  unis : any;
  paises : any;

  constructor(
    private modalCtrl: ModalController,
    private apiserv: ApiservService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.update();

    if (this.id) {
      this.apiserv
        .getBecaById(this.id)
        .then((response) => {
          this.name = response['nombre'];
          this.porcentaje = response['porcentaje'];
          this.requisitos = response['requisitos'];
          this.categoria = response['categoria'];
          this.pais = response['pais'];
          this.universidad = response['universidad'];

          this.porcentaje = Number.parseFloat( this.porcentaje.toString() );
          console.log(this.pais)
          console.log(this.universidad)
        })
        .catch((error) => {
          console.log('error', error);
          this.cancel();
        });
    }
  }

  update() {
    this.apiserv
      .getUnis()
      .then((response) => {
        this.unis = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.unis = [];
      });

    this.apiserv
      .getPaises()
      .then((response) => {
        // console.log('response', response);
        this.paises = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.paises = [];
      });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(
      {
        nombre: this.name,
        porcentaje: this.porcentaje,
        requisitos: this.requisitos,
        categoria: this.categoria,
        pais: this.pais,
        universidad: this.universidad,
      },
      'confirm'
    );
  }

  async deleteBeca() {
    const alert = await this.alertController.create({
      header: 'Cuidado!!',
      message: `Desea <strong>Eliminar</strong> La beca <em>${this.name}</em>?`,
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
