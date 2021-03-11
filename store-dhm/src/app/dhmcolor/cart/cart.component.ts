import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { ProductService } from 'src/app/service/product.service';

=======
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;
>>>>>>> duong

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listProduct: any[] = [];
  listDataCart: any[] = [];
  type = 0;
  cartItem: CartItem[] = [];
  totalPrice: number = 0;
  totalQty: number = 0;
  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getProductCart();
  }

  // getProductCart() {
  //   // this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
  //   // console.log(this.listDataCart);
  //   this.cartItem = this.cartService.cartItems;
  //   this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
  //   this.cartService.totalQty.subscribe(data => this.totalQty = data);
  //   this.cartService.CartTotal();
  // }
  // tang so luong
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem)
  }
  //giam so luong
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }
  // delete(theCartItem: CartItem) {
  //   // this.listDataCart.splice(index);
  //   // localStorage.setItem("Cart", JSON.stringify(this.listDataCart));
  //   this.cartService.remove(theCartItem);
  // }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
<<<<<<< HEAD

=======
  getProductCart() {
    this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
    console.log(this.listDataCart);
  }
  delete(index: any) {
    this.listDataCart.filter(index);
    localStorage.setItem("Cart", JSON.stringify(this.listDataCart));
    window.alert("Xóa thành công");
  }
  buyNow() {
    localStorage.clear();
  }
>>>>>>> duong
}
