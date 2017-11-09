import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Item } from "../menu/item";

@Injectable()
export class Menu extends FirebaseObservable {
	private static dbTag: string = "menus";

	constructor(name: string) {
		super(Menu.dbTag, 
			{
				name: name
			}
		);
	}

	public getName(): string {
		return this.get("name");
	}

	public setName(name: string): Promise<void> {
		return this.set("name", name);
	}

	public getItems(): Promise<Item[]> {
		return FirebaseObservable.GetChildRecords(Item.dbTag, "menuId", this.getId())
			.then(items => items.map(item => <Item>item));
	}
}