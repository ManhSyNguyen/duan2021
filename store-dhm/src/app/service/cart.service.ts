import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { element } from "protractor";
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
        const cart = this.cartItems.find(listCartItem => listCartItem.id === theCartItem.id);
        if (cart) {
            if (this.cartItems.length > 1) {
                this.cartItems.forEach((element: any) => {
                    if (theCartItem.size == element.size) {
                        if (theCartItem.id != element.id) {
                            this.cartItems.push(element);
                            localStorage.setItem("Cart", JSON.stringify(this.cartItems));
                        }
                    }
                    if (this.cartItems.length > 2) {
                    } else {
                        this.cartItems.push(theCartItem);
                        localStorage.setItem("Cart", JSON.stringify(this.cartItems));
                    }
                });
            } else {
                this.cartItems.push(theCartItem);
                localStorage.setItem("Cart", JSON.stringify(this.cartItems));
            }
        } else {
            this.cartItems.push(theCartItem);
            localStorage.setItem("Cart", JSON.stringify(this.cartItems));
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
    }
  // remove(id: string) {
  //   const listData = JSON.parse(localStorage.getItem("Cart")!);
  //   //   const itemIndex = this.cartItems.findIndex(listCartItem => theCartItem.id === theCartItem.id);
  //   //   this.cartItems.splice(itemIndex, 1);
  //   //   this.CartTotal();
  //   let index = listData.findIndex((i) => i.id === id);
  //   listData.splice(index, 1);
  //   localStorage.setItem("Cart", JSON.stringify(listData));
  // }
}
