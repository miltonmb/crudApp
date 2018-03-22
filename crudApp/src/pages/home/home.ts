import { Component } from '@angular/core';
import { NavController, 
  AlertController, // To Add Button
  ActionSheetController // To delete
 } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList, listChanges } from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';
import {FriendsPage} from '../friends/friends';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser:any;
  songsRef:any;
  songs: AngularFireList<any>;
  friendsPage = FriendsPage;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    this.songsRef = afDatabase.list('songs');
    this.songs = this.songsRef.valueChanges();
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = {uid:user.uid, photoURL: user.photoURL};
    }
  );
    
  }

  addSong(){
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'author',
          placeholder: 'Author'
        },

        {
          name: 'title',
          placeholder: 'Title'
        },

        {
          name: 'url',
          placeholder: 'URL'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newSongRef = this.songsRef.push({});

   
            newSongRef.set({
              id: newSongRef.key,
              author: data.author,
              title: data.title,
              uid: this.currentUser.uid,
              userPhoto: this.currentUser.photoURL,
              songLikes: 0,
              isPublic: false,
              songUrl: data.url
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Log Out',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeSong(songId: string, uid){
    if(uid == this.currentUser.uid){
      this.songsRef.remove(songId);
    }else{
      let alert= this.alertCtrl.create({
        title: 'Delete',
        subTitle: 'You are not allowed to delete this!',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  updateSong(songId, songTitle, songAuthor, songURL, uid){
      let prompt = this.alertCtrl.create({
        title: 'Song Name',
        message: "Update the name for this song",
        inputs: [
          {
            name: 'author',
            placeholder: 'Author',
            value: songAuthor
          },
          {
            name: 'title',
            placeholder: 'Title',
            value: songTitle
          },
          {
            name: 'url',
            placeholder: 'URL',
            value: songURL
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
      
              this.songsRef.update(songId, {
                author:data.author, title: data.title, lastUpdatedBy: this.currentUser.uid, songUrl: data.url
              });
            }
          }
        ]
      });
      prompt.present();
  }
  
  likes(songId,Likes){
    Likes++;
    this.songsRef.update(songId, {
      songLikes: Likes});
  }

  changePrivacity(songId, uid, isPublicValue){
    console.log("Estoy dentro");
    if(uid != this.currentUser.uid){
      let alert= this.alertCtrl.create({
        title: 'Change privacity',
        subTitle: 'You are not allowed to change this!',
        buttons: ['Dismiss']
      });
      console.log("tambien entro aqui");
      alert.present();
    }else{
      if(isPublicValue == true){
        this.songsRef.update(songId, {
          isPublic: false
        });
        console.log("tambien entro aqui (TRUE)");
      }else{
        this.songsRef.update(songId, {
          isPublic: true
        });
        console.log("tambien entro aqui(FALSE)");
      }
    }
  }

  addtoMyList(SongTitle, songAuthor){
    const newSongRef = this.songsRef.push({});
    newSongRef.set({
      id: newSongRef.key,
      author: songAuthor,
      title: SongTitle,
      uid: this.currentUser.uid,
      userPhoto: this.currentUser.photoURL,
      songLikes: 0,
      isPublic: false
    });
    let alert =this.alertCtrl.create(
      {
        title: 'Add To My List',
        subTitle:'Added to your list!',
        buttons:['Okay']
      }
    );
    alert.present(); 
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((response)=>{
      console.log('resultado login google:', response);
      
      const userRef = this.afDatabase.list('users');

      userRef.update(response.user.uid, 
        {
          uid: response.user.uid, 
          displayName: response.user.displayName,
          photoURL: response.user.photoURL
        });
      //userRef.push({userId: xx.user.uid, displayName: xx.user.displayName}).then((xx)=>{

      //});
      
    });
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx)=>{

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

}
