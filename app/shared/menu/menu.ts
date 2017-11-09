import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

import { Item } from "../menu/item";

@Injectable()
export class Menu extends FirebaseObservable {
	public static dbTag: string = "menus";

	constructor(initialData?: { [key: string]: any }/*name: string*/) {
		super(Menu.dbTag, 
			/*{
				name: name
			}*/
			initialData
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