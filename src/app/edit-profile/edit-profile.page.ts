import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})


export class EditProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  username: string
  profilePic: string

  password: string
  newpassword: string
  
  busy: boolean = false

//   @ViewChild('fileBtn') fileBtn: {
// 		nativeElement: HTMLInputElement
// 	}

@ViewChild("fileBtn", { static: false }) fileBtn: ElementRef;

  constructor(
    public http: HttpClient, 
    private afs: AngularFirestore,
    private alertController: AlertController,
    private router: Router,
    private user: UserService) {
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      //console.log(event)
      this.username = event.username
      this.profilePic = event.profilePic
      })
    }

  

  ngOnInit() {
  }

  ngOnDestroy() {
		this.sub.unsubscribe()
	}

  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }

	uploadPic(event) {
		const files = event.target.files

		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', '587d619576023678b14f')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe((event: any) => {
			console.log("here",event.file)
			const uuid = event.file
			this.mainuser.update({
				profilePic: uuid
			})
		})
	}
  
  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async updateDetails() {
		this.busy = true

		if(!this.password) {
			this.busy = false
			return this.presentAlert('Error!', 'You have to enter a password')
		}

		try {
			await this.user.reAuth(this.user.getUsername(), this.password)
		} catch(error) {
			this.busy = false
			return this.presentAlert('Error!', 'Wrong password!')
		}

		if(this.newpassword) {
			await this.user.updatePassword(this.newpassword)
		}

		if(this.username !== this.user.getUsername()) {
			await this.user.updateEmail(this.username)
			this.mainuser.update({
				username: this.username
			})
		}

		this.password = ""
		this.newpassword = ""
		this.busy = false

		await this.presentAlert('Done!', 'Your profile was updated!')

		this.router.navigate(['/tabs/feed'])
	}
}
