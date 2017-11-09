import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { Customer } from "../../shared/customer/customer";
import { FirebaseAuthService } from "../../shared/firebase/firebase-auth.service";

import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Page } from "ui/page";
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';
import firebase = require("nativescript-plugin-firebase");
import * as dialogs from "ui/dialogs";

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.css"]
})
export class SignupComponent implements OnInit {

    firstName: string = "myFirstName";
    lastName: string = "myLastName";
    phoneNum: string = "7708949432";
    email: string = "myEmail@gmail.com";
    password: string = "testPassword123";

    constructor(private fbAuthService: FirebaseAuthService,
        private router: RouterExtensions, private fonticon: TNSFontIconService, private page: Page) {
        page.actionBarHidden = true;
        page.statusBarStyle = "dark";
    }

    ngOnInit(): void {

    }

    navigateToHome() {
        // this.router.navigate(['/home']);        
    }

    createAccount(): void {
        console.log(this.email);
        if (this.firstName.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to enter your name',
                'Alright!');
        } else if (this.lastName.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to add a phone number',
                'Alright!');
        } else if (this.phoneNum.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to add a phone number',
                'Alright!');
        } else if (this.email.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to enter an email',
                'Alright!');
        } else if (this.password.length == 0) {
            TNSFancyAlert.showWarning('Try signing in again',
                'Make sure to enter an password',
                'Alright!');
        }
        else {
            /*let customer: Customer = new Customer(this.firstName,
                this.lastName, this.email, this.phoneNum, this.password);*/

            /*this.fbAuthService.createNewUser(this.email, this.password).then((data) => {
                console.log("User created: " + data);
                this.fbDatabaseService.createNewUser(customer);*/
            firebase.createUser({
                email: this.email, 
                password: this.password
            }).then(data => {
                console.log("NEW USER CREATED: " + JSON.stringify(data));

                // firebase.getCurrentUser().then(user => {
                //     // this.router.navigate(['/home']);
                //     TNSFancyAlert.showSuccess('Welcome to Planet Pizza',
                //         'You\'re now ready to order some bomb pizza!',
                //         'Awesome Sause!!');
                //     // this.updateAuthNav();

                // }).catch((error) => {
                //     TNSFancyAlert.showWarning('Wubba Lubba dub-dub',
                //         'Looks like you already have an account, try signing in',
                //         'Okay, thanks');
                // });
            }).catch((error) => {
                let errorMsg = String(error).substr(String(error).indexOf(":")+2);

                TNSFancyAlert.showWarning('Wubba Lubba dub-dub',
                       errorMsg,
                        'Okay, thanks');
                console.log("Trouble creating account: " + error);
            });
        }

    }

    signIn(): void {
        //this.fbDatabaseService.refreshData();
        // this.router.navigate(["/login"], {
        //     transition: {
        //         name: "slideRight",
        //         duration: 300,
        //         curve: "easeInOut"
        //     }
        // });
    }

}
