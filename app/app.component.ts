import { Order } from "./shared/order/order";
import { FirebaseDatabaseService } from "./shared/firebase/firebase-db.service"
import { FirebaseAuthService } from "./shared/firebase/firebase-auth.service"
import { Component, OnInit } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Subject } from 'rxjs/Subject';
import firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private router: Router, private fbAuthService: FirebaseAuthService, private fbDatabaseService: FirebaseDatabaseService) {
    firebase.init({
      onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        this.loggedIn = data.loggedIn;
        if (data.loggedIn) {
          //   fbDatabaseService.initDatabase();

          // if (this.loggedIn == false) {
          //   fbDatabaseService.initDatabase();
          //   this.loggedIn = true;
          // }
          router.navigate(['home']);
          console.log("YES: " + data.loggedIn);
        } else {
          router.navigate(['login']);
          console.log("NOPE: " + data.loggedIn);
        }
      },
      persist: true,
    }).then(
      (instance) => {
        fbDatabaseService.refreshData();
        console.log("firebase.init done");
      },
      (error) => {
        console.log("firebase.init error: " + error);
      }
      );
  }


  ngOnInit() {

  }

}
