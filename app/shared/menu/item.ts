import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Order } from "../payment/order";
import { Menu } from "../menu/menu";

@Injectable()
export class Item extends FirebaseObservable {
	public static dbTag: string = "items";

	constructor(price: number, name: string) {
		super(Item.dbTag, {
			price: price,
			name: name
		});
	}

	public getPrice(): number {
		return this.get("price");
	}

	public setPrice(price: number): Promise<void> {
		return this.set("price", price);
	}

	public getName(): string {
		return this.get("name");
	}

	public setName(name: string): Promise<void> {
		return this.set("name", name);
	}

	public getMenu(): Promise<Menu> {
		return FirebaseObservable.GetRecord(Item.dbTag, this.get("menuId"))
			.then(menu => <Menu>menu);
	}

	public getOrders(): Promise<Order[]> {
		return FirebaseObservable.GetChildRecords(Order.dbTag, "itemId", this.getId())
			.then(orders => orders.map(order => <Order>order));
	}
	/*public getOrders(): Order[] {
		return this.orders;
	}*/
}