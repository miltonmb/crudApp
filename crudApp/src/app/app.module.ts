import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FriendsPage } from '../pages/friends/friends';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
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
    MyApp,
    HomePage,
    FriendsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FriendsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
