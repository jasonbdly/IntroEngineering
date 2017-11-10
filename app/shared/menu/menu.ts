import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Item } from "../menu/item";

@Injectable()
export class Menu extends FirebaseObservable {
	public static dbTag: string = "menus";

	constructor(initialData?: { [key: string]: any }) {
		super(Menu.dbTag, initialData);
	}

	public getName(): string {
		return this.get("name");
	}

	public setName(name: string): Promise<void> {
		return this.set("name", name);
	}

	public getItems(): Promise<Item[]> {
		return FirebaseObservable.GetChildRecords(Item, Item.dbTag, "menuId", this.getId());
	}
}