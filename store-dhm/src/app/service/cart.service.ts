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
    addCart(obj: any) {
      this.cartItems.push(obj);
      localStorage.setItem("Cart", JSON.stringify(this.cartItems));
      this.CartTotal();
    }
    //tinh tong va so luong
    CartTotal() {
        const listDataCart = JSON.parse(localStorage.getItem("Cart")!);
        let totalPriceValue: number = 0;
        let totalQtyValue: number = 0;
        for( const item of listDataCart) {
          totalPriceValue += item.quantityProduct * item.product.priceProduct;
          totalQtyValue += item.quantityProduct;
        }
        this.totalQty.next(totalQtyValue);
        this.totalPrice.next(totalPriceValue);
        this.logCartData(totalPriceValue, totalQtyValue);
    }
    logCartData(totalPriceValue: number, totalQuantityValue: number) {
      const listDataCart = JSON.parse(localStorage.getItem("Cart")!);
        for (let items of listDataCart) {
            const subTotalPrice = items.quantityProduct * items.product.priceProduct;
        }
    }
    addQuantity(theCartItem: any) {
      theCartItem.quantityProduct++;
      localStorage.setItem("Cart", JSON.stringify(theCartItem));
    }
    decrementQuantity(theCartItem: any) {
      theCartItem.quantityProduct--;
      localStorage.setItem("Cart", JSON.stringify(theCartItem));
    }
}
