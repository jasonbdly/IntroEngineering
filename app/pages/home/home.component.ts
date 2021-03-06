import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Customer } from "../../shared/customer/customer";

import { FirebaseAuthService } from "../../shared/firebase/firebase-auth.service";
import { FirebaseDatabaseService } from "../../shared/firebase/firebase-db.service";

import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Page } from "ui/page";
import firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.css"]
})
export class HomeComponent implements OnInit {

    customer: Customer = new Customer;

    constructor(private fbAuthService: FirebaseAuthService, private fbDatabaseService: FirebaseDatabaseService,
        private fonticon: TNSFontIconService, private page: Page) {
        // page.actionBarHidden = true;
        page.statusBarStyle = "dark";

        fbDatabaseService.getCustomer();
    }

    ngOnInit(): void {
       this. fbDatabaseService.customerData.subscribe((customer) => {
            this.customer = customer;
        })
    }

    debug() {
        console.log("Outputed Customer: " + this.customer.getInfoAsString());
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


    logout(): void {
        this.fbAuthService.logout();
    }

}
