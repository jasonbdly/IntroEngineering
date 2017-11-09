import { Injectable } from "@angular/core";

import { FirebaseObservable } from "../firebase/firebase-observable";


import { Order } from "../payment/order";
import { Item } from "../menu/item";

@Injectable()
export class OrderItem extends FirebaseObservable {
    public static dbTag: string = "orderitems";
    
    constructor(menuItem: Item, quantity: number, order: Order){
        super(OrderItem.dbTag,
            {
                menuItem: menuItem,
                quantity: quantity,
                order: order.getId()
            }
        );
    }

    /**
     * Returns the lookup ID
     */
    getMenuItem(): Promise<Item> {
        return FirebaseObservable.GetRecord(Item.dbTag, this.get("itemId"))
            .then(menuItem => <Item>menuItem);
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
        return FirebaseObservable.GetRecord(Order.dbTag, this.get("orderId"))
            .then(order => <Order>order);
    }

    /**
     * Sets the lookup path
     * @param orderLookup 
     */
    setOrder(order: Order): Promise<void> {
        return this.set("orderId", order.getId());
    }
}