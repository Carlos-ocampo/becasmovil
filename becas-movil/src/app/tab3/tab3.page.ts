import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiservService } from '../services/apiserv.service';
import { ManageBecasComponent } from './manage-becas/manage-becas.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  becas: any;
  unis: any;
  countries: any;

  constructor(
    private apiserv: ApiservService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.update();
    this.getBecas();
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
        this.countries = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.countries = [];
      });
  }

  getBecas() {
    this.apiserv
      .getBecas()
      .then((response) => {
        // console.log('response', response);
        this.becas = response;
      })
      .catch((error) => {
        // console.log("error", error);
        this.becas = [];
      });
  }

  formatDate(datestr: string) {
    let dates = new Date(datestr);
    let day = dates.getDate();
    let month = dates.getMonth() + 1;
    let year = dates.getFullYear();
    return day + '/' + month + '/' + year;
    // return "asd";
  }

  getCountryName(id) {
    if (Array.isArray(this.countries)) {
      let country = this.countries.find((country) => country.id == id);
      return country.nombre + ' ' + country.emoji;      
    }
    return '';
  }

  getUniName(id) {
    if (Array.isArray(this.unis)) {
      let uni = this.unis.find((uni) => uni.id == id);
      return uni.nombre;
    }
    return '';
  }

  async openModalEditBeca(becaId) {
    const modal = await this.modalCtrl.create({
      component: ManageBecasComponent,
      componentProps: {
        id: becaId,
        tituloAccion: 'Editar',
        updateStatus: true,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .updateBeca(becaId, data)
        .then((response) => {
          // console.log('response', response);
          this.getBecas();
        })
        .catch((error) => {
          console.log('error', error);
        });
      // this.message = `Hello, ${data}!`;
    } else if (role === 'delete') {
      this.apiserv
        .deleteBeca(data['id'])
        .then((response) => {
          // console.log('response', response);
          this.getBecas();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  async openModalCreateBeca() {
    const modal = await this.modalCtrl.create({
      component: ManageBecasComponent,
      componentProps: {
        tituloAccion: 'Nuevo',
        updateStatus: false,
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.apiserv
        .createBeca(data)
        .then((response) => {
          // console.log('response', response);
          this.getBecas();
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }
}
