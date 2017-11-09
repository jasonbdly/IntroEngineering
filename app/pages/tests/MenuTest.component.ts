import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { Customer } from "../../shared/customer/customer";
import { Menu } from "../../shared/menu/menu";
import { Card, CardType } from "../../shared/payment/card";
import { Payment, PaymentMethod } from "../../shared/payment/payment";
import { Item } from "../../shared/menu/item";
import { Addon } from "../../shared/menu/addon";
import { Order } from "../../shared/payment/order";
import { OrderItem } from "../../shared/orderItem/orderItem";

import { Page } from "ui/page";

@Component({
	selector: "ns-menu-test",
	moduleId: module.id,
	templateUrl: "./MenuTest.component.html"
})
export class MenuTestComponent implements OnInit {
	private menu: Menu
	private menuItem: Item
	private addon: Addon
	private order: Order
	private orderItem: OrderItem
	private card: Card
	private payment: Payment

	constructor(private page: Page, private router: RouterExtensions) {
		page.actionBarHidden = true;
		page.statusBarStyle = "dark";
	}

	ngOnInit(): void {

	}

	createMenu(): void {
		this.menu = new Menu();
		this.menu.setName("TEST__menu");
	}

	createMenuItem(): void {
		if (this.menu) {
			this.menuItem = new Item();
			this.menuItem.setPrice(8.0);
			this.menuItem.setName("TEST__item");
			this.menuItem.setMenu(this.menu);
		}
	}

	createAddon(): void {
		if (this.menuItem) {
			this.addon = new Addon();
			this.addon.setName("TEST__addon");
			this.addon.setPrice(0.5);
			this.addon.setMenuItem(this.menuItem);
		}
	}

	createOrder(): void {
		Customer.GetCurrentCustomer().then(
			customer => {
				console.log("GOT USER: " + customer.getInfoAsString());
				this.order = new Order();
				this.order.setCustomer(customer);
			}
		);
	}

	createOrderItem(): void {
		if (this.order && this.menuItem) {
			this.orderItem = new OrderItem();
			this.orderItem.setMenuItem(this.menuItem);
			this.orderItem.setQuantity(5);
			this.orderItem.setOrder(this.order);
		}
	}

	createCard(): void {
		this.card = new Card();
		this.card.setNumber("4444333322221111");
		this.card.setType(CardType.MasterCard);
		this.card.setName("TEST__card");
	}

	createPayment(): void {
		this.payment = new Payment();
		this.payment.setCost(55.34);
		this.payment.setDate(new Date());
		this.payment.setMethod(PaymentMethod.DebitCard);
	}
}