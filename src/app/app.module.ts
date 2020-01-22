import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import {UserService} from './user.service'
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ShareModule} from './share.module'
import { AngularFireFunctionsModule, FunctionsRegionToken} from '@angular/fire/functions'
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { PhotoViewer} from '@ionic-native/photo-viewer/ngx'
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonicGestureConfig } from './IonicGestureConfig';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule,
    ShareModule,
    AngularFireFunctionsModule,
    NgxIonicImageViewerModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    AuthService,
    { provide: FunctionsRegionToken, useValue: 'us-central1'},
    Keyboard,
    PhotoViewer,{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
