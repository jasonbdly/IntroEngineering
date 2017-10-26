import { Injectable } from "@angular/core";

import { IndexedDBItem } from "../dbitem/dbitem";

@Injectable()
export class Addon extends IndexedDBItem {
	private static dbTag: string = "addons";

	private price: number;
	private name: string;

	constructor(name: string, price: number) {
		super();

		this.name = name;
		this.price = price;
	}

	getId(): number {
		return this.id;
	}

	getPrice(): number {
		return this.price;
	}

	getName(): string {
		return this.name;
	}

	public static GetAddon(id: number): Addon {
		return <Addon>super.GetDBItem(this.dbTag, id);
	}
}