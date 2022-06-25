import { Component, OnInit } from '@angular/core';
import { ApiservService } from '../services/apiserv.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(private apiserv:ApiservService) {}

  ngOnInit(): void {
      // console.log('TabsPage ngOnInit', '[' + this.apiserv.getUserTokenSetted() + ']');
  }

}
