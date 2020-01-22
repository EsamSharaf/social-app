import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';

import { Keyboard } from '@ionic-native/keyboard/ngx';


@Component({
	selector: 'app-post',
	templateUrl: './post.page.html',
	styleUrls: ['./post.page.scss'],
})

export class PostPage implements OnInit {
	
	@ViewChild('playWord', { static: false }) playWord: ElementRef
	@ViewChild('playCard', { static: false }) playCard: any

	key: string;
	postID: string
	effect: string = ''
	post
	postReference: AngularFirestoreDocument
	sub
	heartType: string = "heart-empty"
	clicks_num: number
	
	//Game Variables
	guesses: string[] = [];
	word: string = "";
  	word_guess:string = ""
	


	// @HostListener('mouseover') onMouseOver() {
	// 	this.keyboard.show();
	//   }
	  
	constructor(
		private route: ActivatedRoute, 
		private afs: AngularFirestore,
		private user: UserService,
		public keyboard: Keyboard) {}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) { 
		this.key = event.key;
		if(this.clicks_num > 0) {
			this.clicks_num-=1;
		}else {
			this.clicks_num=0;
		}
		
		if(this.clicks_num > 0 ) {
			this.guess(this.key)
		}
		
	}

	  
	@HostListener('document:click', ['$event'])
	andClickEvent(event: { target: any; }) { 
    	if (this.playWord.nativeElement.contains(event.target)) {
		this.showkeyboard();
		}
		//console.log(event)
 	}
	 

	ionViewWillEnter(){
		this.ngOnInit()
		this.guesses = [" "]
		this.playCard.el.style.setProperty('--background', 'white')
	} 

	ngOnInit() {
		//this.clicks_num = 0
		this.postID = this.route.snapshot.paramMap.get('id')
		this.postReference = this.afs.doc(`posts/${this.postID}`)
		this.sub = this.postReference.valueChanges().subscribe(val => {
			this.post = val
			this.effect = val.effect
			//this.heartType = val.likes.includes(this.user.getUID()) ? 'heart' : 'heart-empty'
			this.word = this.post.desc
			this.clicks_num = this.post.clicks_num
			//console.log(this.clicks_num)
			
			this.reveal_word()
		})
		//com.google.gms:google-services:4.2.0
	}

	showkeyboard() {
		setTimeout( () => {
			this.keyboard.show();
			},350
		  );
	}

	ngOnDestroy() {
		this.sub.unsubscribe()
	}

	toggleHeart() {
		if(this.heartType == 'heart-empty') {
			this.postReference.update({
				likes: firestore.FieldValue.arrayUnion(this.user.getUID())
			})
		} else {
			this.postReference.update({
				likes: firestore.FieldValue.arrayRemove(this.user.getUID())
			})
		}
	}

	guess(a: any){
		
		this.guesses.push(a.toUpperCase());
		this.guesses.push(a.toLowerCase())
		
		//console.log(this.guesses)
		//if(this.word.indexOf(a) > -1){
		  return this.reveal_word();
		//}
	  }

	
	reveal_word(){
	let reveal = "";
	for(var i=0; i<this.word.length; i++){
		// Character is in the word or it isn't in the alphabet
		if(this.guesses.indexOf(this.word[i]) > -1){
			//console.log("this.guesses.indexOf(this.word[i]) ", this.guesses.indexOf(this.word[i]) )
			reveal += this.word[i];
			}else{
			reveal += "_";
		}
	}
	this.word_guess = reveal;
	// Victory
	if(reveal == this.word){
		this.playCard.el.style.setProperty('--background', 'Chartreuse')
		//this.victory = true;
		//return true;
	}
	//return false;
	}

	// reset_game(){
	// 	return this.wordRandomizer.getWord().then((word) =>{
	// 	  this.word = word;
	// 	  this.guesses = [];
	// 	  this.guesses_left = this.settings.max_guesses;
	// 	  this.reveal_word();
	// 		});
	//  }
		
	

}