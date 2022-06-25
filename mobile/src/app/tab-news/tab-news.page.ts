import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ApiservService } from '../services/apiserv.service';

@Component({
  selector: 'app-tab-news',
  templateUrl: './tab-news.page.html',
  styleUrls: ['./tab-news.page.scss'],
})
export class TabNewsPage implements OnInit {
  news: any;

  constructor(
    private apiserv: ApiservService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getNews();
  }

  async getNews() {
    const loading = await this.loadingController.create({
      cssClass: '',
      message: 'Consultando...',
    });
    await loading.present();

    await this.apiserv
      .getNews()
      .then((data) => {
        this.news = data['results'];
      })
      .catch((err) => {
        console.log(err);
        this.news = [];
      });

    await loading.dismiss();
  }

  getImage(arrmedia) {
    if (arrmedia[0]) {
      if (arrmedia[0].type == 'image') {
        let metadata = arrmedia[0]['media-metadata'];
        return metadata[metadata.length - 1].url;
      }
    }
    return 'asd';
  }

  beImage(arrmedia) {
    if (arrmedia[0]) {
      if (arrmedia[0].type == 'image') {
        return true;
      }
    }
    return false;
  }
}
