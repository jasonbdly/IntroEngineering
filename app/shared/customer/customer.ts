import { Injectable } from "@angular/core";

import firebase = require("nativescript-plugin-firebase");
import { FirebaseObservable } from "../firebase/firebase-observable";

@Injectable()

export class Customer extends FirebaseObservable {
    public static dbTag: string = "users";

    constructor(initialData?: { [key: string]: any }) {

        super(Customer.dbTag, initialData);
    }

    /**
     * Returns first name the customer
     */
    public getFirstName(): string {
        return this.get("first_name");
    }

    public setFirstName(value: string): Promise<void> {
        return this.set("first_name", value);
    }

    /**
     * Returns the last name of the customer
     */
    public getLastName(): string {
        return this.get("last_name");
    }

    public setLastName(value: string): Promise<void> {
        return this.set("last_name", value);
    }

    public getName(): string {
        return this.getFirstName() + " " + this.getLastName();
    }

    /**
     * Sets the name of the Customer
     * @param firstName customer's first name
     * @param lastName customer's last name
     */
    public setName(firstName: string, lastName?: string): Promise<void> {
        return this.setFirstName(firstName).then(
            () => this.setLastName(lastName)
        );
    }

    /**
     * Returns the email of the user
     */
    public getEmail(): string {
        return this.get("email");
    }

    /**
     * Updates the customer's email
     * @param email customer's email
     */
    public setEmail(email: string): Promise<void> {
        return this.set("email", email);
    }

    /**
     * Returns customers phone number
     */
    public getPhoneNumber(): string {
        return this.get("phone");
    }

    /**
     * Updates the customers phone number
     * @param number customer's phone number
     */
    public setPhoneNumber(number: string): Promise<void> {
        return this.set("phone", number);
    }

    /**
     * Updates the users password
     * @param pass customer's password
     */
    /*public setPassword(pass: string): Promise<void> {
        return this.set("password", pass);
        //this.password = pass;
    }*/

    /**
     * Returns true if the attempted password matches the exsisting one
     * @param passAttemp customer's password attempt
     */
    /*public checkPassword(passAttemp: string): boolean {
        return this.get("password") === passAttemp;
    }*/

    /**
     * Returns the Customers atributes as a string for degugging
     */
    public getInfoAsString(): string {
        return "\n************ Customer Atributes ************" +
            "\nFirst Name: " + this.getFirstName() + 
            "\nLast Name: " + this.getLastName() + 
            "\nEmail: " + this.getEmail() + 
            "\nPhone Number: " + this.getPhoneNumber() + 
            "\nInternal ID: " + this.getId() +
            "\n********************************************";
    }

    public static GetCurrentCustomer(): Promise<Customer> {
        return firebase.getCurrentUser()
            .then(user => {
                console.log("CURRENT USER: " + JSON.stringify(user));
                if (user && user.uid) {
                    var userNameParts = user.name.split(" ");
                    return FirebaseObservable.GetRecord(Customer, Customer.dbTag, user.uid, {
                        first_name: userNameParts[0],
                        last_name: userNameParts.slice(1).join(" "),
                        email: user.email,
                        phone: user.phoneNumber
                    }).then(customer => {
                        return customer.ready.then(() => {
                            return customer;
                        });
                    });
                } else {
                    throw "Not currently logged in";
                }
            });
    }
}