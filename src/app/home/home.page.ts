import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, MenuController, NavController } from '@ionic/angular'; //added 1
import { AuthService } from '../auth.service'; //added 1


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{          //added1 implements OnInit

  constructor(
    private authService : AuthService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    
  }

  // setTimeout(() => {
  //   this.ionViewWillEnter()
  //  }, 3000)

  

  ionViewWillEnter() {
    
    setTimeout( () => {
      this.navCtrl.navigateRoot('/tabs',)
      },2000
    );
        //this.navCtrl.navigateRoot('/tabs',);
  }
}
  

  // go() {
  //   this.router.navigateByUrl('/tabs');
  // }

  // ionViewDidLoad() {
  //   this.router.navigateByUrl('/tabs');
  // } 


