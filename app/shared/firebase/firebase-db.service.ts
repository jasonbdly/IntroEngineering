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

    public customerData = new BehaviorSubject(new Customer);


    /**
 * Determins if the user has a path created for storage and creates one if not.
 */
    createNewUser(customer: Customer): void {

        let firstName: string = customer.getFirstName();
        let lastName: string = customer.getLastName();
        let phone: string = customer.getPhone();
        let email: string = customer.getEmail();

            firebase.setValue(
                '/users/' + this.userId,
                {
                    'first': firstName,
                    'last': lastName,
                    'phone': phone,
                    'email': email,
                    'address': {
                        'street': '',
                        'number': ''
                    }
                }
            ).then((data) => {
                this.refreshData();
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
                console.log("Event type: " + result.type);
                console.log("Key: " + result.key);
                console.log("Value: " + JSON.stringify(result.value));
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
                    let customer: Customer = new Customer(
                        '321',
                        data.first_name,
                        data.last_name,
                        data.email,
                        data.phone
                    )
                    this.customerData.next(customer);
                });
        })

    }

}