import { Injectable } from "@angulare/core";

import { IndexedDBItem } from "../dbitem/dbitem";

export enum CardType {
	Visa = 1,
	MasterCard,
	Discover,
	AmericanExpress,
}

@Injectable()
export class Card extends IndexedDBItem {
	private static dbTag: string = "cards";

	private number: string;
	private type: CardType;
	private name: string;

	constructor(number: string, type: CardType, name: string) {
		super();

		this.number = number;
		this.type = type;
		this.name = name;
	}

	getNumber(): string {
		return this.number;
	}

	getType(): CardType {
		return this.type;
	}

	getName(): string {
		return this.name;
	}

	public static GetCard(id: number): Card {
		return <Card>super.GetDBItem(this.dbtag, id);
	}
}