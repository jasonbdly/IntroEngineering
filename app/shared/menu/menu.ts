import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";

import { Item } from "../menu/item";

@Injectable()
export class Menu extends IndexedDBItem {
	private static dbTag: string = "menus";

	private name: string;

	private items: Item[];

	constructor(name: string) {
		super()

		this.name = name;
	}

	getName(): string {
		return this.name;
	}

	public static GetMenu(id: number): Menu {
		return <Menu>super.GetDBItem(this.dbTag, id);
	}
}