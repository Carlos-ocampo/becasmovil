import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  public places = [
    {
      id: '1',
      title: 'Empresa 1',
      imageUrl: 'https://c.tenor.com/INom0uGbdHoAAAAC/asdf-movie-asdf.gif',
    },
    {
      id: '2',
      title: 'Empresa 2',
      imageUrl: 'https://img-07.stickers.cloud/packs/6bbfef47-d910-40fb-8314-7af7be70cf7c/webp/52132f2a-37a1-4beb-b3f6-0f85a8596a89.webp',
    }
  ];

  constructor() { }

  ngOnInit() {}

}
