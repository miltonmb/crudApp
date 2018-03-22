import { ErrorHandler, NgModule } from '@angular/core';
import { IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { FriendsPage } from './friends';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCcKscRfYJ-IKJfweajMej3F0SrkWCffXg",
  authDomain: "list-69df8.firebaseapp.com",
  databaseURL: "https://list-69df8.firebaseio.com",
  projectId: "list-69df8",
  storageBucket: "list-69df8.appspot.com",
  messagingSenderId: "772678627357"
};

@NgModule({
  declarations: [
    FriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsPage),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
})
export class FriendsPageModule {}
