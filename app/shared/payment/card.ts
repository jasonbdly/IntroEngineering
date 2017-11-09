import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";

export enum CardType {
	Visa = 1,
	MasterCard,
	Discover,
	AmericanExpress,
}

@Injectable()
export class Card extends FirebaseObservable {
	public static dbTag: string = "cards";

	constructor(initialData?: { [key: string]: any }) {
		super(Card.dbTag, initialData
		);
	}

	public getNumber(): string {
		return this.get("number");
	}

	public setNumber(number: string): Promise<void> {
		return this.set("number", number);
	}

	public getType(): CardType {
		return this.get("type");
	}

	public setType(type: CardType): Promise<void> {
		return this.set("type", type);
	}

	public getName(): string {
		return this.get("name");
	}

	public setName(name: string): Promise<void> {
		return this.set("name", name);
	}
}