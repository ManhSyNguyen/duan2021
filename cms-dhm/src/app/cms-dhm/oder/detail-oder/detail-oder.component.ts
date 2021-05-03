import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../../service/order.service';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../../service/product.service';

@Component({
  selector: 'app-detail-oder',
  templateUrl: './detail-oder.component.html',
  styleUrls: ['./detail-oder.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DetailOderComponent implements OnInit {
  inputForm!: FormGroup;
  searchForm!: FormGroup;
  listOrderBySku: any[] = [];
  listOrderSearch: any[] = [];
  idUser: any;
  sku: any;
  nameuser: any;
  sdt: any;
  email: any;
  addr: any;
  status: any;
  paymentmethod: any;
  totalPriceAll: Subject<number> = new Subject<number>();
  totalQty: Subject<number> = new Subject<number>();
  totalPrice: any;
  thanhtoan: any;
  coc: any;
  idOrders!: number;
  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastService: ToastrService,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      sku: ['']
    });
    this.getOrderBySku();
    this.totalPriceAll.subscribe(data => {
      this.totalPrice = ((data / 10) + data);
    });
  }
  get if(): any {
    return this.inputForm.controls;
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  // tslint:disable-next-line:typedef
  modelchange(event: any){
    this.coc = event;
    console.log(this.totalPrice - event);
  }
  getOrderBySku() {
    this.activeRoute.paramMap.subscribe(param => {
      const sku = param.get('sku');
      this.orderService.getOrderBySku(sku).subscribe(res => {
        console.log('res1', res);
        this.idOrders = res.id;
        this.idUser = res.id;
        this.sku = res.sku;
        this.nameuser = res.namecustom;
        this.email = res.email;
        this.sdt = res.phone;
        this.addr = res.address;
        this.status = res.status;
        this.paymentmethod = res.paymentmethod;
        this.listOrderBySku = res.orderProductDetails;
        console.log('this.listOrderBySku', this.listOrderBySku);
        this.CartTotal();
      });
    });
  }

  CartTotal() {
    let totalPriceValue = 0;
    let totalQtyValue = 0;
    if (this.listOrderBySku) {
      for (const item of this.listOrderBySku) {
        totalPriceValue += item.quantity * item.productDetail.product.priceProduct;
        totalQtyValue += item.quantity;
      }
      this.totalQty.next(totalQtyValue);
      this.totalPriceAll.next(totalPriceValue);
    }
  }
  searchProductBySku() {
    if (this.searchForm.invalid){
      this.toastService.error('Vui lòng nhập mã để tìm kiếm');
      return;
    }
    this.productService.getProductBySku(this.sf.sku.value).subscribe(res => {
      if (res) {
        console.log(res);
        const obj = {
            id: {
              idOrder: this.idOrders,
              idProductDetail: res.id,
            },
            productDetail: res,
            quantity: res.priceProductDetail,
            price: res.product.priceProduct,
            status: res.status
        };
        this.listOrderBySku.push(obj);
        console.log('this.listOrderBySku', this.listOrderBySku);
        this.CartTotal();
      }
    });
  }
  tangsoluong(theCartItem: any) {
    this.addQuantity(theCartItem, this.listOrderBySku);
    this.CartTotal();
  }
  incrementQuantity(theCartItem: any) {
    this.decrementQuantity(theCartItem, this.listOrderBySku);
    this.CartTotal();
  }
  addQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          quantity : theCartItem.quantity++;
        }
      });
    }
  }
  decrementQuantity(theCartItem: any, arr: any) {
    if (arr.length > 0){
      arr.map((e: any) => {
        if (e.id === theCartItem.id){
          // tslint:disable-next-line:no-unused-expression label-position
          quantity : theCartItem.quantity--;
        }
      });
    }
  }
  update() {
    let param = {
      idUser: this.idUser,
      namecustom: this.nameuser,
      email: this.email,
      phone: this.sdt,
      address: this.addr,
      status: this.status,
      productDetailList: this.listOrderBySku,
      deposit: this.coc,
      totalMonenyOrder: this.totalPrice - this.coc,
    };
    this.orderService.updateOrder(param, this.idOrders).subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }
  cancel() {
    this.router.navigate(['/oders']);
  }
}
