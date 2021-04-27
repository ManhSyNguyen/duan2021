import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../service/product.service";
import {Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  searchForm!: FormGroup;
  inputForm!: FormGroup;
  totalPriceAll: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  listProduct: any[] = [];
  totalPrice: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      sku: ['', [Validators.required]]
    });
    this.inputForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      addr: ['', [Validators.required]],
      type: [0]
    });
    this.totalPriceAll.subscribe(data => {
      this.totalPrice = data;
    });
  }
  get if(): any {
    return this.searchForm.controls;
  }
  searchProductBySku() {
    if (this.searchForm.invalid){
      this.toastService.error("Vui lòng nhập mã để tìm kiếm");
      return;
    }
    this.productService.getProductBySku(this.if.sku.value).subscribe(res => {
      if (res) {
        this.listProduct.push(res);
        this.CartTotal();
      }
    });
  }
  tangsoluong(theCartItem: any) {
    this.addQuantity(theCartItem, this.listProduct);
    this.CartTotal();
  }
  incrementQuantity(theCartItem: any) {
    this.decrementQuantity(theCartItem, this.listProduct);
    this.CartTotal();
  }
  CartTotal() {
    let totalPriceValue = 0;
    let totalQtyValue = 0;
    if (this.listProduct) {
      for (const item of this.listProduct) {
        totalPriceValue += item.priceProductDetail * item.product.priceProduct;
        totalQtyValue += item.priceProductDetail;
      }
      this.totalQty.next(totalQtyValue);
      this.totalPriceAll.next(totalPriceValue);
    }
  }
  addQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          priceProductDetail : theCartItem.priceProductDetail++;
        }
      });
    }
  }
  decrementQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          priceProductDetail : theCartItem.priceProductDetail--;
        }
      });
    }
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  addOrder() {
    if (this.inputForm.invalid){
      this.toastService.error("Vui lòng nhập đầy đủ thông tin khách hàng !!!");
      return;
    }
    let obj = {
      namecustom: this.iF.name.value,
      email: this.iF.email.value,
      address: this.iF.addr.value,
      phone: this.iF.phone.value,
      paymentmethod: this.iF.type.value,
      productDetailList: this.listProduct,
      status: 3,
      totalMonenyOrder: (this.totalPrice / 10) + this.totalPrice,
    };
    this.orderService.createOrder(obj).subscribe((data: any) => {
      if (data) {
        this.toastService.success('Mua hàng thành công !!!');
        window.localStorage.removeItem('Cart');
        window.location.reload();
      } else {
        this.toastService.error('Lỗi mua hàng không thành công !!!');
      }
    });
  }
}
