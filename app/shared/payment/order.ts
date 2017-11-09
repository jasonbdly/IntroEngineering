import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Customer } from "../customer/customer";
import { Item } from "../menu/item";

@Injectable()
export class Order extends FirebaseObservable{
	public static dbTag: string = "orders";

	constructor(initialData?: { [key: string]: any }/*customer: Customer*/) {
		super(Order.dbTag,/*{
			customerId: customer.getId()
		}*/initialData);
	}

	public getCustomer(): Promise<Customer> {
		return FirebaseObservable.GetRecord(Customer, Customer.dbTag, this.get("customerId"))
			.then(customer => customer);
	}

	public setCustomer(customer: Customer): Promise<void> {
		return this.set("customerId", customer.getId());
	}
}

/*
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
*/