import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';

//import { LoginPage } from '../login/login.page'; //added 1 https://blog.flicher.net/ionic-4-user-registration-login-tutorial/ 
import { RegisterPage } from '../register/register.page'; //added 1 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ]),
    HomePageRoutingModule
  ],
  declarations: [HomePage, RegisterPage], //added 1 ..e , LoginPage, RegisterPage]
  entryComponents: [ RegisterPage]    //added 1 entryComponents: [LoginPage, RegisterPage]
})
export class HomePageModule {}
