import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiservService } from '../services/apiserv.service';
import { EditPaisComponent } from './edit-pais/edit-pais.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  paisesList: any;
  isModalOpen = false;

  constructor(
    private apiserv: ApiservService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises() {
    this.apiserv
      .getPaises()
      .then((response) => {
        // console.log("response", response);
        this.paisesList = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.paisesList = [];
      });
  }

  async openModalEditCountry(countryId) {
    const modal = await this.modalCtrl.create({
      component: EditPaisComponent,
      componentProps: {
        id: countryId,
        tituloAccion: 'Editar',
        updateStatus: true,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .updatePais(countryId, data)
        .then((response) => {
          // console.log('response', response);
          this.getPaises();
        })
        .catch((error) => {
          console.log('error', error);
        });
      // this.message = `Hello, ${data}!`;
    } else if (role === 'delete') {
      this.apiserv
        .deletePais(data['id'])
        .then((response) => {
          // console.log('response', response);
          this.getPaises();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  async openModalCreateCountry() {
    const modal = await this.modalCtrl.create({
      component: EditPaisComponent,
      componentProps: {
        tituloAccion: 'Nuevo',
        updateStatus: false,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .createPais(data)
        .then((response) => {
          // console.log('response', response);
          this.getPaises();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }
}
