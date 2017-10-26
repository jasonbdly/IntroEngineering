import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";
import { Customer } from "../customer/customer";
import { Item } from "../menu/item";

@Injectable()
export class Order extends IndexedDBItem {
	private static dbTag: string = "orders";

	private customer: Customer;

	private items: Item[];

	constructor(customer: Customer) {
		super();

		this.customer = customer;
		this.items = [];
	}

	getId(): number {
		return this.id;
	}

	getCustomer(): Customer {
		return this.customer;
	}

	public static GetOrder(orderId: number): Order {
		return <Order>super.GetDBItem(this.dbTag, orderId);
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