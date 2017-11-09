import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Order } from "../payment/order";

export enum PaymentMethod {
    CreditCard = 1,
    DebitCard,
    Check
}

@Injectable()
export class Payment extends FirebaseObservable {
    public static dbTag: string = "payments";

    constructor(initialData?: { [key: string]: any }/*cost: number, date: Date, method: PaymentMethod*/) {
        super(Payment.dbTag,
            /*{
                cost: cost,
                date: date,
                methodId: method
            }*/
            initialData
        );
    }

    public getCost(): number {
        return this.get("cost");
    }

    public setCost(cost: number): Promise<void> {
        return this.set("cost", cost);
    }

    public getDate(): Date {
        return this.get("date");
    }

    public setDate(date: Date): Promise<void> {
        return this.set("date", date);
    }

    public getMethod(): PaymentMethod {
        return this.get("method");
    }

    public setMethod(method: PaymentMethod): Promise<void> {
        return this.set("method", method);
    }
}