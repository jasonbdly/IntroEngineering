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
						that.set("id", newRecordKey);
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

	public getCreatedDate(): Date {
		return this.createdDate;
	}

	public getReady(): Promise<any> {
		return this.ready;
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
			var record = <T>FirebaseObservable.RecordCache[dbTag + "_" + id] ||
				new recordType(Object.assign({
					id: id
				}, initialData || {}));
			
			//Wait for the record to be "ready" before returning it
			record.getReady().then(() => {
				resolve(record);
			});
		});
	}

	public static GetRecords<T extends FirebaseObservable>(recordType: {new(data?: { [key: string]: any }): T;}, dbTag: string): Promise<T[]> {
		return firebase.query(() => {},
			"/" + dbTag,
			{
				singleEvent: true,
				orderBy: {
					type: firebase.QueryOrderByType.KEY
				}
			}
		).then(
			queryData => {
				//Initialize async retrieve and init logic for all matching records
				var records = (queryData && queryData.value && Object.keys(queryData.value).map(
					//Records come back in an object, but we need them in an array
					recordDataKey => queryData.value[recordDataKey]
				).map(
					//Map this record to the cached version first, then fallback to creating a new local instance
					//of the propery wrapper class
					recordData => <T>FirebaseObservable.RecordCache[dbTag + "_" + recordData["id"]] ||
						new recordType(recordData)
				)) || <T[]>[];

				//Wait for all records to be ready before returning them
				if (records.length) {
					return Promise.all(records.map(record => record.getReady())).then(() => {
						return records;
					});
				} else {
					return records;
				}
			}
		);
	}

	public static GetChildRecords<T extends FirebaseObservable>(recordType: {new(data?: { [key: string]: any}): T;}, childDBTag: string, lookupField: string, parentId: string): Promise<T[]> {
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
			queryData => {
				var records = (queryData && queryData.value && queryData.value.map(
					recordData => <T>FirebaseObservable.RecordCache[childDBTag + "_" + recordData["id"]] || 
						new recordType(recordData)
				)) || <T[]>[];

				if (records.length) {
					return Promise.all(records.map(record => record.getReady())).then(() => {
						return records;
					});
				} else {
					return records;
				}
			}
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