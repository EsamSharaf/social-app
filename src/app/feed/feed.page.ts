import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'
import { UserService} from '../user.service'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core'
//import * as firebase from 'firebase/app';
//import { Firebase } from '@ionic-native/firebase/ngx';
import { NavController } from '@ionic/angular';

  @Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  posts: []
  sub
  mainuser: AngularFirestoreDocument
  userPosts
  username: string
  profilePic: string
  //ishidden: boolean = true;

  constructor(
    private aff: AngularFireFunctions,
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router,
    private navCtrl: NavController
    //private firebase: Firebase,
    //private changeRef: ChangeDetectorRef
    ) {
      
      this.mainuser = afs.doc(`users/${user.getUID()}`)
      this.sub = this.mainuser.valueChanges().subscribe(event => {
      console.log("feedComponentPOsts =", event.posts)
      this.posts = event.posts
			// this.username = event.username
      // this.profilePic = event.profilePic
  })
    //this.changeRef.detectChanges();
    //this.ishidden =false
  }

  // onPageWillEnter() {
  //   console.log('onPageWillEnter is fired')
  //   this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
  //   this.sub = this.mainuser.valueChanges().subscribe(event => {
  //         console.log("feedComponentPOsts =", event.posts)
  //         this.posts = event.posts})
  // }

  //ionViewWillEnter () {
  //   this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
  //   this.sub = this.mainuser.valueChanges().subscribe(event => {
  //   console.log("feedComponentPOsts =", event.posts)
  //   this.posts = event.posts
       
  //   this.navCtrl.navigateRoot('/tabs/feed'); // previous view will be cached
  //   this.navCtrl.navigateRoot('/tabs/feed') // force refresh
  // // })
   //}

  // IonViewDidLoad() {
  //   //this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
  //   this.sub = this.mainuser.valueChanges().subscribe(event => {
  //   console.log("feedComponentPOsts =", event.posts)
  //   this.posts = event.posts
  //   })
  // }

  ngOnInit() { 
    // this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
    // this.sub = this.mainuser.valueChanges().subscribe(event => {
    // console.log("feedComponentPOsts =", event.posts)
    // this.posts = event.posts

    // const getFeed = this.aff.httpsCallable('getFeed')
    // this.sub = getFeed({text:"Hi"}).subscribe(data => {
    //     this.posts = data
    //     console.log(data)
    //     return this.posts});
    //})
  }
  
    goTo(postID: string) {
      //console.log(postID)
      this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
      //this.deletUserPost(postID)
    }


    // deletUserPost(post) {
    //   //this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
    //   this.mainuser.update({posts: firebase.firestore.FieldValue.arrayRemove(post)
    //   })} 
    //   // (event => {
    //   // console.log(event.posts)
    //   // })}


  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}

//824x657