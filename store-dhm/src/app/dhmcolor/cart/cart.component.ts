import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  inputForm!: FormGroup;
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
    public formBuilder: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listCartProduct();
    this.inputForm = this.formBuilder.group({
      hoten: [''],
      email: [''],
      addr: [''],
      phone: [''],
      type: [0],
    });
  }
  listCartProduct() {
    // this.cartItem = this.cartService.cartItems;
    this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQty.subscribe(
      data => this.totalQty = data
    );
    this.cartService.CartTotal();
  }
  get iF(): any {
    return this.inputForm.controls;
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
    this.cartService.addQuantity(theCartItem);
  }
  // giam so luong
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }
  delete(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
  // getListAllProduct() {
  //   this.ProductService.getAllProduct().subscribe(data => {
  //     this.listProduct = data;
  //   });
  // }
  // getProductCart() {
  //   this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
  //   console.log(this.listDataCart);
  // }
  buyNow() {
    let obj = {
      namecustom: this.iF.hoten.value,
      email: this.iF.email.value,
      address: this.iF.addr.value,
      phone: this.iF.phone.value,
      product : this.listDataCart,
    }
  }
}
