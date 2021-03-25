import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { CartItem } from "../model/cart-item";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cartItems: CartItem[] = [];
    totalPrice: Subject<number> = new Subject<number>();
    totalQty: Subject<number> = new Subject<number>();

    constructor(
    ) { }

    addToCart(theCartItem: CartItem) {
        let cart = this.cartItems.find(listCartItem => listCartItem.id === theCartItem.id);
        if (cart) {
            if (theCartItem.size != cart.size) {
                this.cartItems.push(theCartItem);
            } else {
                cart.quantity++;
            }
        } else {
            this.cartItems.push(theCartItem);
            localStorage.setItem("Cart", JSON.stringify(theCartItem));
        }
        this.CartTotal();
    }
    //tinh tong va so luong
    CartTotal() {
        let totalPriceValue: number = 0;
        let totalQtyValue: number = 0;
        for (let currentCartItem of this.cartItems) {
            totalPriceValue += currentCartItem.quantity * currentCartItem.price;
            totalQtyValue += currentCartItem.quantity;
        }
        this.totalQty.next(totalQtyValue);
        this.totalPrice.next(totalPriceValue);
        this.logCartData(totalPriceValue, totalQtyValue);
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        for (let listCartItem of this.cartItems) {
            const subTotalPrice = listCartItem.quantity * listCartItem.price;
            console.log(`name: ${listCartItem.nameproduct}, quantity=${listCartItem.quantity}, unnitPrice=${listCartItem.price} , subTotalPrice=${subTotalPrice}`);
        }
        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log('-----------')
    }
    addQuantity(theCartItem: CartItem) {
        theCartItem.quantity++;
    }
    decrementQuantity(theCartItem: CartItem) {
        theCartItem.quantity--;
        if (theCartItem.quantity == 0) {
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