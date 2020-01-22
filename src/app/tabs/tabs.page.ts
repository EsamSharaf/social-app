import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IonTabs, MenuController} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs', { static: true }) tabs: IonTabs;
  
  constructor(
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.tabs.select('feed')
    this.menuCtrl.enable(true);
  }

}