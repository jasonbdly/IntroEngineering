import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

@Injectable()
export class Addon extends FirebaseObservable {
	public static dbTag: string = "addons";

	constructor(name: string, price: number) {
		super(Addon.dbTag, {
			name: name,
			price: price
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
}