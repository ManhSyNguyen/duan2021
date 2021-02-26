import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../model/cart-item";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQty: Subject<number> = new Subject<number>();

    constructor() { }

    //them vao gio hang
    addToCart(theCartItem: CartItem) {
        // let alreadyExitstsIncart: boolean = false;
        // let existingCartItem: CartItem = undefined;

        // if (this.cartItems.length > 0) {
        //     existingCartItem = this.cartItems.find(listCartItem => listCartItem.id === theCartItem.id);
        //     alreadyExitstsIncart = (existingCartItem != undefined);
        // }
        // if (alreadyExitstsIncart) {
        //     existingCartItem.qty++;
        // } else {
        //     this.cartItems.push(theCartItem);
        // }
        this.CartTotal();
    }
    //tinh tong va so luong
    CartTotal() {
        let totalPriceValue: number = 0;
        let totalQtyValue: number = 0;
        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.qty * currentCartItem.price;
            totalQtyValue += currentCartItem.qty;
        }
        this.totalQty.next(totalQtyValue);
        this.totalPrice.next(totalPriceValue);
        this.logCartData(totalPriceValue, totalQtyValue);
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        for (let listCartItem of this.cartItems) {
            const subTotalPrice = listCartItem.qty * listCartItem.price;
            console.log(`name: ${listCartItem.nameproduct}, quantity=${listCartItem.qty}, unnitPrice=${listCartItem.price} , subTotalPrice=${subTotalPrice}`);
        }
        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log('-----------')
    }
    decrementQuantity(theCartItem: CartItem) {
        theCartItem.qty--;
        if (theCartItem.qty == 0) {
            this.remove(theCartItem)
        }
    }
    remove(theCartItem: CartItem) {
        // lay id trong mang cartItem
        const itemIndex = this.cartItems.findIndex(listCartItem => theCartItem.id === theCartItem.id);
        // xoa du lieu theo index da chon
        if (itemIndex > -1) {
            this.cartItems.splice(itemIndex, 1);
            this.CartTotal()
        }
    }
}