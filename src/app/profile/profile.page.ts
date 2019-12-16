import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService} from '../user.service'
import { Router } from '@angular/router';


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


  constructor(
    private afs: AngularFirestore,
    private user: UserService,
    private router: Router
  ) { 
    this.mainuser = afs.doc(`users/${user.getUID()}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
      console.log(event)
      console.log(event)
      this.posts = event.posts
			this.username = event.username
			this.profilePic = event.profilePic
    })
  }

  goTo(postID: string) {

		this.router.navigate(['/tabs/post/' + postID.split('/')[0]])
	}

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

  ngOnInit() {
  }

}
