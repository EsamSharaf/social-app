import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService} from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  username: string = ""
	password: string = ""
	cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    //public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService,
    public alertController: AlertController

    ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string){
    const alert = await this.alertController.create({
      header: title,
      message:content,
      buttons: ['OK']
    })

    await alert.present()

  }

  async register() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
      //this.showAlert("Error!", "passwords do not match")
      return console.error("Passwords don't match")
    }
    try {
        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@codeed.com', password)

        this.afstore.doc(`users/${res.user.uid}`).set({
          username
        })

        if(res.user) {
          this.user.setUser({
            username,
            uid: res.user.uid
          })
        }

        //this.showAlert("Success", "Welcome")
        this.presentAlert('Success', 'You are registered!')
        this.router.navigate(['/tabs'])
      } catch(err){
        console.dir(err)
        //this.showAlert("Error", err.message)
        this.presentAlert("Error", err.message)
      }
  
  }
  
  // async showAlert(header: string, message: string) {
	// 	const alert = await this.alert.create({
	// 		header,
	// 		message, 
	// 		buttons: ["OK"]
	// 	})

	// 	await alert.present()
	//}
    
}
