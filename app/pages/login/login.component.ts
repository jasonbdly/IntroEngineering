import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { FirebaseDatabaseService } from "../../shared/firebase/firebase-db.service";
import { FirebaseAuthService } from "../../shared/firebase/firebase-auth.service";


import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Page } from "ui/page";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import firebase = require("nativescript-plugin-firebase");

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);
import * as dialogs from "ui/dialogs";


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"]
})
export class LoginComponent implements OnInit {

    email: string = "myEmail@gmail.com";
    password: string = "testPassword123";

    constructor(private fbDatabaseService: FirebaseDatabaseService, private fbAuthService: FirebaseAuthService,
        private router: RouterExtensions, private fonticon: TNSFontIconService, private page: Page) {
        page.actionBarHidden = true;
        page.statusBarStyle = "dark";
    }

    ngOnInit(): void {

    }

    googleLogin() {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(
            function (result) {
                JSON.stringify(result);
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
            );
    }

    passwordLogin(): void {
        console.log(this.email);
        if (this.email.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to enter an email',
                'Alright!');
        }
        else if (this.password.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to enter an password',
                'Alright!');
        }
        else {
            this.fbAuthService.loginEmail(this.email, this.password).then((data) => {})
        }

    }

    signUp(): void {
        this.router.navigate(["/signup"], {
            transition: {
                name: "slideLeft",
                duration: 300,
                curve: "easeInOut"
            }
        });
    }

}
