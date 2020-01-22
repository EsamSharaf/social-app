import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService} from '../user.service'
import { Router } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { HammerGestureConfig } from '@angular/platform-browser'
import { ActionSheetController} from '@ionic/angular'
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  mainuser: AngularFirestoreDocument
  userPosts
  sub
  posts
	username: string
	profilePic: string

  postDetails
  subpostDetails
  
  title: string
  
  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router,
    public viewer: PhotoViewer,
    private alertController: AlertController,
    private actionCtrl: ActionSheetController
  ) { 
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
    console.log('postsInProfilePage', event.posts)
    
    this.posts = event.posts
    console.log(event)
    this.username = event.username
    this.profilePic = event.profilePic
    })

  }
  
  // ionViewDidLoad(){
  //   this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
  //   this.sub = this.mainuser.valueChanges().subscribe(event => {
  //   console.log('postsInProfilePage', event.posts)
  // })}


  ngOnInit() {

  }

  goTo(post: string) {

    var image = 'https://ucarecdn.com/'+ post + '/-/preview//'
    
    this.postDetails = this.afs.doc(`posts/`+ post)
    this.subpostDetails = this.postDetails.valueChanges().subscribe(event => {
    //console.log(event)
    this.title = event.desc
    //console.log("titleIn =", this.title)
    this.viewer.show(image, this.title, {share: true});
    })
    
  }

  async onPress(post) {
    //console.log("onPress", $event);
    
    this.actionCtrl.create({
      buttons: [
        {
          text: "delete",
          icon: 'trash',
          handler: () => {
            this.mainuser.update({posts: firebase.firestore.FieldValue.arrayRemove(post)
                })         
          }
        }
      ]
    }).then(ac => ac.present())
  }

  // onPressUp($event) {
     
  //   console.log("onPressUP", $event);
    

  //   const alert = await this.alertController.create({
	// 		header: 'Done',
	// 		message: 'Your post was created!',
  //     buttons: ['Cool!']
  //   })
  //   console.log("pressed")
  //}

  ngOnDestroy() {
    this.sub.unsubscribe()
    if(this.subpostDetails){
      this.subpostDetails.unsubscribe()
    } 
  }

}

