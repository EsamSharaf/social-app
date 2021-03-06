import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'
//import { Http } from '@angular/http'

import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service'
import {firestore } from 'firebase/app'
import { AlertController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})

export class UploaderPage implements OnInit { 

  imageURL: string
  desc: string
  clicks_num: number
  
  sub

  busy : boolean = false
  
  scaleCrop: string = '-/scale_crop/200x200'

  effects = {
		effect1: '',
		// effect2: '-/exposure/50/-/saturation/50/-/warmth/-30/',
		// effect3: '-/filter/vevera/150/',
		// effect4: '-/filter/carris/150/',
		// effect5: '-/filter/misiara/150/'
	}
	
  activeEffect: string = this.effects.effect1

  //@ViewChild('fileButton') fileButton
  @ViewChild("fileButton", { static: false }) fileButton: ElementRef;
  @ViewChild('inputId', {  static: false })  inputElement: IonInput;

  constructor(
    public http: HttpClient,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router:Router) { 
      
      // this.events.subscribe('updateScreen', () => {
      //   this.zone.run(() => {
      //     console.log('force update the screen');
      //   });
      // });

    }

   

    ngAfterViewInit() {
        setTimeout(() => {
           
      }, 400);
    }
    
  ngOnInit() {
    //console.log("refresh")
    this.imageURL = ""
  }

  ionViewWillEnter(){
  this.ngOnInit()
  } 

  async createPost(){
    
    this.busy = false

    const image = this.imageURL
    const desc = this.desc
    const activeEffect = this.activeEffect
    const clicks_num= this.clicks_num
    
    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(`${image}/${activeEffect}`)
    })

    this.afstore.doc(`posts/${image}`).set({
      desc,
      author: this.user.getUsername(),
      //likes:[],
      effect: activeEffect ,
      clicks_num,
    })

    this.busy = false
    this.imageURL = ""
    this.desc = ""

    const alert = await this.alertController.create({
			header: 'Done',
			message: 'Your post was created!',
      buttons: ['Cool!']
    })
    
    await alert.present()

		this.router.navigate(['/tabs/feed'])
  }

  setSelected(effect: string) {
		this.activeEffect = this.effects[effect]
	}

  uploadFile() {
    this.fileButton.nativeElement.click()
  }

  fileChanged(event) {

    this.busy = true
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE','1')
    data.append('UPLOADCARE_PUB_KEY', '587d619576023678b14f') //aba46a927a034a47d1d2

    this.http.post('https://upload.uploadcare.com/base/', data)
    .subscribe((event: any) => {
      //console.log(event)
      this.imageURL = event.file
      this.busy = false
      
      
    })
  }

  ngOnDestroy() {
    
  }

}