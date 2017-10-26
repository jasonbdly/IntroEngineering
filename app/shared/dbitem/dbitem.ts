import { Injectable } from "@angular/core";

@Injectable()
export class IndexedDBItem {
	private static ItemIndex: { [key: string]: { [key: number]: IndexedDBItem; }} = {};
	private static LastItemIndex: { [key: string]: number; } = {};

	protected id: number;

	protected constructor() {
		if (!IndexedDBItem.LastItemIndex[this.constructor.name]) {
			IndexedDBItem.LastItemIndex[this.constructor.name] = 0;
		}

		var lastIndex = (IndexedDBItem.LastItemIndex[this.constructor.name]++);
		this.id = lastIndex;

		var indexForType = IndexedDBItem.ItemIndex[this.constructor.name] || (IndexedDBItem.ItemIndex[this.constructor.name] = {});
		indexForType[this.id] = this;
	}

	protected static GetDBItem(type: string, id: number): IndexedDBItem {
		return IndexedDBItem.ItemIndex[type] && IndexedDBItem.ItemIndex[type][id];

		//TODO: Sync up with firebase service to auto-retrieve if not found in local cache
	}
}