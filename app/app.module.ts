import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

import { FirebaseDatabaseService } from "./shared/firebase/firebase-db.service"
import { FirebaseAuthService } from "./shared/firebase/firebase-auth.service"

import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { HomeComponent } from "./pages/home/home.component";

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

import firebase = require("nativescript-plugin-firebase");

// firebase.init({
//     onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
//         console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
//         if (data.loggedIn) {
//             console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
//         }
//     }
// }).then(
//     (instance) => {
//         console.log("firebase.init done");
//     },
//     (error) => {
//         console.log("firebase.init error: " + error);
//     }
//     );

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        TNSFontIconModule.forRoot({
            'fa': './assets/font-awesome.css',
            'ion': './assets/ionicons.css'
        }),
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent
    ],
    providers: [
        ItemService,
        FirebaseDatabaseService,
        FirebaseAuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
