import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiservService } from '../services/apiserv.service';
import { ManageUniComponent } from './manage-uni/manage-uni.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  universidades: any;

  constructor(
    private apiserv: ApiservService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.getUnis();
  }

  getUnis() {
    this.apiserv
      .getUnis()
      .then((response) => {
        // console.log("response", response);
        this.universidades = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.universidades = [];
      });
  }

  async openModalEditUni(uniId) {
    const modal = await this.modalCtrl.create({
      component: ManageUniComponent,
      componentProps: {
        id: uniId,
        tituloAccion: 'Editar',
        updateStatus: true,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .updateUni (uniId, data)
        .then((response) => {
          // console.log('response', response);
          this.getUnis();
        })
        .catch((error) => {
          console.log('error', error);
        });
      // this.message = `Hello, ${data}!`;
    } else if (role === 'delete') {
      this.apiserv
        .deleteUni(data['id'])
        .then((response) => {
          // console.log('response', response);
          this.getUnis();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  async openModalCreateUni() {
    const modal = await this.modalCtrl.create({
      component: ManageUniComponent,
      componentProps: {
        tituloAccion: 'Nuevo',
        updateStatus: false,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .createUni(data)
        .then((response) => {
          // console.log('response', response);
          this.getUnis();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }
}
