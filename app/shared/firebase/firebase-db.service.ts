import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Customer } from "../customer/customer";

import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseDatabaseService {

    constructor() {
        console.log("Firebase Constructor");
    }

    private userId;

    // customer: Customer = new Customer('123', "Quinn", 'Breedlove', 'qslick04@gmail.com', '770999482');
    // public customerData = new BehaviorSubject(this.customer);

    public customerData = new BehaviorSubject(new Customer);

    /**
 * Determins if the user has a path created for storage and creates one if not.
 */
    createNewUser(customer: Customer): void {

        let firstName: string = customer.getFirstName();
        let lastName: string = customer.getLastName();
        let phone: string = customer.getPhoneNumber();
        let email: string = customer.getEmail();

        firebase.getCurrentUser().then((user) => {
            firebase.setValue(
                '/users/' + user.uid,
                {
                    'first_name': firstName,
                    'last_name': lastName,
                    'phone': phone,
                    'email': email,
                    'address': {
                        'street': '',
                        'number': ''
                    }
                }
            ).then((data) => {
                console.log("User record created: " + data);
                this.refreshData();
            }).catch((error) => {
                console.log("Error creating user record in the Database: " + error);
            });
        });

    }

    refreshData(): void {
        this.getCustomer();
    }

    getCustomer() {
        var onQueryEvent = function (result) {
            // note that the query returns 1 match at a time
            // in the order specified in the query
            if (!result.error) {
                //console.log("Event type: " + result.type);
                //console.log("Key: " + result.key);
                //console.log("Value: " + JSON.stringify(result.value));
            }
        };

        firebase.getCurrentUser().then((user) => {
            console.log("Getting data for the userId: " + user.uid);

            firebase.query(
                onQueryEvent,
                "/users/" + user.uid,
                {
                    singleEvent: true,
                    // order by company.country
                    orderBy: {
                        type: firebase.QueryOrderByType.CHILD,
                        value: 'since' // mandatory when type is 'child'
                    },

                }).then((data) => {
                    // console.log("Pulled the logged in uses's data for: " + JSON.stringify(data.value));
                    let customer: Customer = new Customer(
                        data.value.first_name,
                        data.value.last_name,
                        data.value.email,
                        data.value.phone
                    );
                    // console.log("Generated Customer Object with the following atributes:" + customer.getInfoAsString());
                    this.customerData.next(customer);
                });
        })

    }

}