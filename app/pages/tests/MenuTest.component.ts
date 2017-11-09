import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { Menu } from "../../shared/menu/menu";
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
	menuName: string;

	constructor(private page: Page, private router: RouterExtensions) {
		page.actionBarHidden = true;
		page.statusBarStyle = "dark";
	}

	ngOnInit(): void {

	}

	createMenu(): void {
		new Menu(this.menuName);
	}

	createMenuItem(): void {
		new Item(8.0, "TEST_Item");
	}

	createAddon(): void {

	}

	createOrder(): void {

	}

	createOrderItem(): void {

	}

	createCard(): void {

	}

	createPayment(): void {

	}

	createPaymentMethod(): void {

	}
}