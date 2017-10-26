import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";

@Injectable()
export class Customer extends IndexedDBItem {
    private static dbTag: string = "users";

    //private id: string;
    private firstName: string;
    private lastName: string;
    private email: string;
    private phoneNumber: string;
    private password: string

    constructor(/*id?: string, */firstName?: string, lastName?: string,
        email?: string, phoneNumber?: string, password?: string) {
        super();

        //this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    /**
     * Returns first name the customer
     */
    getFirstName(): string {
        return this.firstName;
    }

    /**
     * Returns the last name of the customer
     */
    getLastName(): string {
        return this.email;
    }

    /**
     * Sets the name of the Customer
     * @param firstName customer's first name
     * @param lastName customer's last name
     */
    setName(firstName: string, lastName?: string): void {
        this.firstName = firstName;
        if (lastName != null) {
            this.lastName = lastName;
        }
    }

    /**
     * Returns the email of the user
     */
    getEmail() {
        return this.email;
    }

    /**
     * Updates the customer's email
     * @param email customer's email
     */
    setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Returns customers phone number
     */
    getPhone(): string {
        return this.phoneNumber;
    }

    /**
     * Updates the customers phone number
     * @param number customer's phone number
     */
    setPhone(number: string): void {
        this.phoneNumber = number;
    }

    /**
     * Updates the users password
     * @param pass customer's password
     */
    updatePassword(pass: string): void {
        this.password = pass;
    }

    /**
     * Returns true if the attempted password matches the exsisting one
     * @param passAttemp customer's password attempt
     */
    checkPassword(passAttemp: string): boolean {
        if (this.password == passAttemp) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns the Customers atributes as a string for degugging
     */
    getInfoAsString(): string {
        let info = 
        "\n************ Customer Atributes ************" +
        "\nFirst Name: " + this.firstName + 
        "\nLast Name: " + this.lastName + 
        "\nEmail: " + this.email + 
        "\nPhone Number: " + this.phoneNumber + 
        "\nInternal ID: " + this.id +
        "\n********************************************";
        
        return info;
    }

    public static GetCustomer(id: number): Customer {
        return <Customer>super.GetDBItem(this.dbTag, id);
    }
}