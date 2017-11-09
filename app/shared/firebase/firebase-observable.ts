import { Injectable } from "@angular/core";

import firebase = require("nativescript-plugin-firebase");

import { Observable } from "data/observable";

export class FirebaseObservable extends Observable {

	private static RecordCache: { [key: string]: FirebaseObservable } = {};

	protected ready: Promise<any>
	private id: string
	private createdDate: Date

	protected constructor(private dbTag: string, initialData?: Object) {
		super();

		var that = this;

		that.ready = new Promise((resolve, reject) => {
			if (initialData && initialData["id"]) {
				FirebaseObservable.getRecord(dbTag, initialData["id"])
					.then(recordData => {
						for (var fieldName in recordData) {
							super.set(fieldName, recordData[fieldName]);
						}
						that.id = initialData["id"];
						FirebaseObservable.RecordCache[that.dbTag + "_" + that.id] = that;
					}).then(() => resolve());
			} else {
				FirebaseObservable.createRecord(dbTag)
					.then(newRecordKey => {
						super.set("id", newRecordKey);
						that.id = newRecordKey;
						that.createdDate = new Date();
						FirebaseObservable.RecordCache[that.dbTag + "_" + that.id] = that;
						that.set("createdDate", that.createdDate);
					}).then(() => resolve());
			}
		}).then(() => {
			if (initialData) {
				for (var fieldName in initialData) {
					that.set(fieldName, initialData[fieldName]);
				}
			}
		}).then(() => {
			firebase.addValueEventListener(
				result => {
					if (result.value) {
						super.set(result.key, result.value);
					}
				},
				"/" + this.dbTag + "/" + that.get("id")
			)
		});
	}

	public set(fieldName: string, value: any): Promise<void> {
		return this.ready.then(() => {
			//console.log("Setting field value: " + fieldName + " to " + value);
			return firebase.update(
				"/" + this.dbTag + "/" + this.get("id") + "/" + fieldName,
				value
			).then(() => {
				super.set(fieldName, value);
			})
		});
	}

	public setFields(fieldValues: { [key: string]: any }): Promise<void> {
		var that = this;
		return this.ready.then(() => {
			return Promise.all.apply(Promise, Object.keys(fieldValues).map(
				fieldName => that.set(fieldName, fieldValues[fieldName])
			));
		});
	}

	public getId(): string {
		return this.id;
	}

	public get(fieldName: string): any {
		return super.get(fieldName);
	}

	private static getRecord(dbTag: string, id: string): Promise<Object> {
		var path = "/" + dbTag;

		return firebase.query(() => {},
			path + "/" + id,
			{
				singleEvent: true,
				orderBy: {
					type: firebase.QueryOrderByType.KEY
				},
				range: {
					type: firebase.QueryRangeType.EQUAL_TO,
					value: id
				},
				limit: {
					type: firebase.QueryLimitType.FIRST,
					value: 1
				}
			}
		).then(queryData => queryData.value);
	}

	public static GetRecord<T extends FirebaseObservable>(recordType: {new(data?: { [key: string]: any }): T;}, dbTag: string, id: string, initialData?: { [key: string]: any }): Promise<T> {
		return new Promise((resolve, reject) => {
			resolve(<T>FirebaseObservable.RecordCache[dbTag + "_" + id] ||
				new recordType(Object.assign({
					id: id
				}, initialData || {}))
			);
		});
	}

	public static GetChildRecords(childDBTag: string, lookupField: string, parentId: string): Promise<FirebaseObservable[]> {
		return firebase.query(() => {},
			"/" + childDBTag,
			{
				singleEvent: true,
				orderBy: {
					type: firebase.QueryOrderByType.VALUE,
					value: lookupField
				},
				range: {
					type: firebase.QueryRangeType.EQUAL_TO,
					value: parentId
				}
			}
		).then(
			queryData => queryData.value.map(
				recordData => FirebaseObservable.RecordCache[childDBTag + "_" + recordData["id"]] || 
					new FirebaseObservable(childDBTag, recordData)
			)
		);
	}

	private static createRecord(dbTag: string): Promise<string> {
		var path = "/" + dbTag;
		return firebase.push(
			path,
			{}
		).then(createResult => createResult.key);
	}
}