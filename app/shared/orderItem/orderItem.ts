import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";


import { Order } from "../payment/order";
import { Item } from "../menu/item";

@Injectable()
export class OrderItem extends FirebaseObservable {
    public static dbTag: string = "orderitems";
    
    constructor(initialData?: { [key: string]: any }/*menuItem: Item, quantity: number, order: Order*/){
        super(OrderItem.dbTag,
            /*{
                menuItem: menuItem.getId(),
                quantity: quantity,
                order: order.getId()
            }*/
            initialData
        );
    }

    /**
     * Returns the lookup ID
     */
    getMenuItem(): Promise<Item> {
        return FirebaseObservable.GetRecord(Item, Item.dbTag, this.get("itemId"))
            .then(menuItem => menuItem);
    }

    /**
     * Sets the lookup ID
     * @param lookup 
     */
    setMenuItem(menuItem: Item): Promise<void> {
        //this.menuItemLookup = lookup;
        return this.set("menuItemId", menuItem.getId());
    }

    /**
     * Returns the quantity
     */
    getQuantity(): number {
        return this.get("quantity");
    }

    /**
     * Sets the quantity
     * @param quantity 
     */
    setQuantity(quantity: number): Promise<void> {
        //this.quantity = quantity;
        return this.set("quantity", quantity);
    }

    /**
     * Returns the order lookup path
     */
    getOrder(): Promise<Order> {
        return FirebaseObservable.GetRecord(Order, Order.dbTag, this.get("orderId"))
            .then(order => order);
    }

    /**
     * Sets the lookup path
     * @param orderLookup 
     */
    setOrder(order: Order): Promise<void> {
        return this.set("orderId", order.getId());
    }
}