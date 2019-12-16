import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IonTabs} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  @ViewChild('tabs') tabs: IonTabs
  //@ViewChild("tabs", { static: true }) tabs: ElementRef;
  constructor() { }

  ngOnInit() {
    this.tabs.select('feed')
  }

}