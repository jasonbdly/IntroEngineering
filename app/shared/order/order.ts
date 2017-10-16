import { Injectable } from "@angular/core";
import { OrderItem } from "../orderItem/orderItem";
import { Payment } from "../payment/payment";

@Injectable()
export class Order {

    private orders: OrderItem[];
    private payment: Payment;

    constructor(orders?: OrderItem[], payment?: Payment) {
        this.orders = orders;
        this.payment = payment;
    }

    getPayment(): Payment {
        return this.payment;
    }

    setPayment(payment: Payment): void {
        this.payment = payment;
    }

    getOrders(): OrderItem[] {
        return this.orders;
    }

    addOrder(order: OrderItem): void {
        this.orders.push(order);
    }

    setOrders(orders: OrderItem[]): void {
        this.orders = orders;
    }

}