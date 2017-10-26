import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";
import { Order } from "../payment/order";

@Injectable()
export class Item extends IndexedDBItem {
	private static dbTag: string = "items";

	private price: number;
	private name: string;

	private orders: Order[];

	constructor(price: number, name: string) {
		super();

		this.orders = [];
	}

	public getId(): number {
		return this.id;
	}

	public getPrice(): number {
		return this.price;
	}

	public getName(): string {
		return this.name;
	}

	public getOrders(): Order[] {
		return this.orders;
	}

	public GetOrder(id: number): Order {
		return this.orders.find(order => order.getId() === id);
	}

	public static GetItem(id: number): Item {
		return <Item>super.GetDBItem(this.dbTag, id);
	}
}