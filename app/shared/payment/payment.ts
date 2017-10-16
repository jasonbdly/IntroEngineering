import { Injectable } from "@angular/core";

Injectable()
export class Payment{

    private id: string;
    private customerLookup: string;
    private type: string;
    private cardNumber: string;

    constructor(id: string, customerLookup: string, type: string, cardNumber: string){
        this.id = id;
        this.customerLookup = customerLookup;
        this.type = type;
        this. cardNumber = cardNumber;
    }

    /**
     * Returns id of the payment
     */
    getId(): string{
        return this.id;
    }

    /**
     * Sets the id of the payment
     * @param id 
     */
    setId(id: string): void {
        this.id = id;
    }

    /**
     * Returns Customer id
     */
    getCustomerLookup(): string {
        return this.customerLookup;
    }

    /**
     * Sets the id of the customer
     * @param customerLookup 
     */
    setCustomerLookup(customerLookup: string): void {
        this.customerLookup = customerLookup;
    }

    /**
     * Returns card type ie. Visa
     */
    getType(): string {
        return this.type;
    }

    /**
     * Sets the card type ie. Visa
     * @param type 
     */
    setType(type: string): void {
        this.type = type;
    }

    /**
     * Returns the card number
     */
    getCardNumber(): string {
        return this.cardNumber;
    }

    /**
     * Sets the cardNumber
     * @param cardNumber 
     */
    setCardNumber(cardNumber: string): void {
        this.cardNumber = cardNumber;
    }



}