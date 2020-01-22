import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ShareModule } from '../share.module';
//import { PhotoViewer} from '@ionic-native/photo-viewer/ngx'
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ShareModule,
    //PhotoViewer,
    NgxIonicImageViewerModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
