import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList, listChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  usersRef: firebase.database.Reference;
  users: Array<any>;
  loadedUsers: Array<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public afDatabase: AngularFireDatabase) {
    this.usersRef = firebase.database().ref('users');
    this.usersRef.on('value', userList => {
      let users = [];
      userList.forEach( user => {
        users.push(user.val());
        return false;
      });
    
      this.users = users;
      this.loadedUsers = users;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }
  initializeItems(): void {
    this.users = this.loadedUsers;
  }

  getItems(searchbar) {
    this.initializeItems();
    var q = (searchbar.srcElement||searchbar.target).value;
    if (!q) {
      return;
    }
    this.users = this.users.filter((v) => {
      if(v.displayName && q) {
        if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

}
