import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../service/order.service';
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
  quantity: number = 1;

  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastrService,
    public OrderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.listCartProduct();
    // this.getCity();
    this.inputForm = this.formBuilder.group({
      hoten: ['',[Validators.required]],
      email: ['',[Validators.required]],
      addr: ['',[Validators.required]],
      phone: ['',[Validators.required]],
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
    if(this.listDataCart){
      this.cartService.CartTotal();
    }
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  // tang so luong
  incrementQuantity(theCartItem: any) {
    this.cartService.addQuantity(theCartItem);
    // this.cartService.CartTotal();
  }
  // giam so luong
  decrementQuantity(theCartItem: any) {
    this.cartService.decrementQuantity(theCartItem);
  }

  delete(id: string) {
    const conf = confirm("Bạn có chắc chắn muốn xóa sản phẩm khỏi giỏ hàng ??");
    if (conf) {
      let index = this.listDataCart.findIndex((i: any) => i.id === id);
      this.listDataCart.splice(index, 1);
      localStorage.setItem("Cart", JSON.stringify(this.listDataCart));
      this.toastService.success('Xóa sản phẩm thành công');
    }
  }

  buyNow() {
    if (this.inputForm.invalid) {
      this.toastService.error("Vui lòng điền đẩy đủ thông tin");
      return;
    }
    let obj = {
      namecustom: this.iF.hoten.value,
      email: this.iF.email.value,
      address: this.iF.addr.value,
      phone: this.iF.phone.value,
      paymentmethod: this.iF.type.value,
      productDetailList: this.listDataCart,
      status: 0,
    };
    this.OrderService.createOrder(obj).subscribe(data => {
      if (data) {
        this.toastService.success("Mua hàng thành công !!!");
        window.localStorage.removeItem("Cart");
        window.location.reload();
      } else {
        this.toastService.error("Lỗi mua hàng không thành công !!!");
      }
    });
  }
  // getCity() {
  //   this.ProductService.getCityVietNam().subscribe(res => {
  //     if (res) {
  //       console.log(res);
  //     }
  //   });
  // }
}
