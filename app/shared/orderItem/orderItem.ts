import { Injectable } from "@angular/core";

@Injectable()
export class OrderItem{

    private menuItemLookup: string;
    private quantity: number;
    private orderLookup: string;
    
    constructor(menuItemLookup: string, quantity: number, orderLookup: string){
        this.menuItemLookup = menuItemLookup;
        this.quantity = quantity;
        this.orderLookup = orderLookup;
    }

    /**
     * Returns the lookup ID
     */
    getMenuItemLookup(): string {
        return this.menuItemLookup;
    }

    /**
     * Sets the lookup ID
     * @param lookup 
     */
    setMenuItemLookup(lookup: string): void {
        this.menuItemLookup = lookup;
    }

    /**
     * Returns the quantity
     */
    getQuantity(): number {
        return this.quantity;
    }

    /**
     * Sets the quantity
     * @param quantity 
     */
    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    /**
     * Returns the order lookup path
     */
    getOrderLookup(): string {
        return this.orderLookup;
    }

    /**
     * Sets the lookup path
     * @param orderLookup 
     */
    setOrderLookup(orderLookup: string): void {
        this.orderLookup = orderLookup;
    }


}