import { Component, ViewChild, ElementRef } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  //rootPage: any = HomePage;
@ViewChild('IonRouterOutlet', { static: false }) routerOutlet: any; 

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();

    // statusBar.styleDefault();
    // splashScreen.hide();
    // this.rootPage = HomePage;

    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else if (this.router.url === '/LoginPage') {
        //this.platform.exitApp(); 
  
        // or if that doesn't work, try
        navigator['app'].exitApp();
      } else {
        console.log("Exit", "Do you want to exit the app?")//, this.onYesHandler, this.onNoHandler, "backPress");
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      //this.authService.getToken();

    })}

  // ngOnint() {
  //   this.router.events.subscribe((event: RouterEvent) => {
  //     if (event instanceof NavigationEnd && event.url === '/login') {
  //       this.menuCtrl.enable(false);
  //     }
  //   });
  // }

  logout() {
    //this.router.navigate(['/login']) //ByUrl('/login')
    this.navCtrl.navigateRoot(['/login'])
  }
}
