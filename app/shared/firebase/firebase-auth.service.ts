import { Injectable } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Customer } from "../customer/customer";

import firebase = require("nativescript-plugin-firebase");
import { TNSFancyAlert, TNSFancyAlertButton } from 'nativescript-fancyalert';

@Injectable()
export class FirebaseAuthService {

    constructor(private router: RouterExtensions) {
        console.log("Firebase Constructor");
    }

    updateAuthNav(): void {
        firebase.getCurrentUser().then((data) => {
            this.router.navigate(["/home"], {
                transition: {
                    name: "slideRight",
                    duration: 300,
                    curve: "easeInOut"
                }
            });
        })
    }

    createNewUser(email: string, password: string): Promise<any> {
       return firebase.createUser({
            email: email,
            password: password
        });
    }

    // createNewUser(email: string, password: string): Promise<any> {
    //     return firebase.createUser({
    //         email: email,
    //         password: password
    //     }).then(


    //         function (result) {
    //             TNSFancyAlert.showSuccess('Welcome to Planet Pizza',
    //                 'You\'re now ready to order some bomb pizza!',
    //                 'Awesome Sause!!');
    //         },
    //         function (errorMessage) {
    //             TNSFancyAlert.showWarning('Wubba Lubba dub-dub',
    //                 errorMessage,
    //                 'Okay, thanks');
    //         }
    //         );
    // }

    loginEmail(email: string, password: string): Promise<any> {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: email,
                password: password
            }
        }).then((data) => {
            this.updateAuthNav();

        }).catch((error) => {
            let errorMsg = String(error).substr(String(error).indexOf(":")+2);            
            console.log("Error Message Signing In: " + errorMsg);
            TNSFancyAlert.showWarning('Wubba Lubba dub-dub',
                'Check your email and password. It doesn\'t look like you have an account',
                'Okay, thanks'
            )
        });
            // function (result) {
            //     JSON.stringify(result);
            // },
            // function (errorMessage) {
            //     console.log("Error Message Signing In: " + JSON.stringify(errorMessage));
            //     TNSFancyAlert.showWarning('Wubba Lubba dub-dub',
            //         'Check your email and password. It doesn\'t look like you have an account',
            //         'Okay, thanks');
            // }
    }

    logout(): void {
        firebase.logout();
    }

}