import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Item } from "../menu/item";

@Injectable()
export class Addon extends FirebaseObservable {
	public static dbTag: string = "addons";

	constructor(initialData?: { [key: string]: any }/*name: string, price: number, item: Item*/) {
		super(Addon.dbTag, /*{
			name: name,
			price: price,
			itemId: item.getId()
		}*/initialData);
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

	public getMenuItem(): Promise<Item> {
		return FirebaseObservable.GetRecord(Item, Item.dbTag, this.get("itemId"))
			.then(item => item);
	}

	public setMenuItem(item: Item): Promise<void> {
		return this.set("itemId", item.getId());
	}
}