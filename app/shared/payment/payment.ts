import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";
import { Order } from "../payment/order";

export enum PaymentMethod {
    CreditCard = 1,
    DebitCard,
    Check
}

@Injectable()
export class Payment extends IndexedDBItem {
    private static dbTag: string = "payments";

    private cost: number;
    private date: Date;
    private method: PaymentMethod;
    private order: Order;

    constructor(cost: number, date: Date, method: PaymentMethod) {
        super();

        this.cost = cost;
        this.date = date;
        this.method = method;
    }

    /**
     * Returns id of the payment
     */
    getId(): number {
        return this.id;
    }

    getCost(): number {
        return this.cost;
    }

    getDate(): Date {
        return this.date;
    }

    getMethod(): PaymentMethod {
        return this.method;
    }

    public static GetPayment(paymentId: number): Payment {
        return <Payment>super.GetDBItem(this.dbTag, paymentId);
    }
}