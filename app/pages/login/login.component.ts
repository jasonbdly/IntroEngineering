import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { Page } from "ui/page";
import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);


@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.css"]
})
export class LoginComponent implements OnInit {

    constructor(private fonticon: TNSFontIconService, private page: Page) {
        page.actionBarHidden = true;
        page.statusBarStyle = "dark";
     }

    ngOnInit(): void {
       
    }

    googleLogin(): void {

    }

    facebookLogin(): void {

    }

    anonymousLogin(): void {

    }
}
