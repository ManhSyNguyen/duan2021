import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../service/order.service';
import {TokenStorageService} from "../../service/token-storage.service";
import {AuthService} from "../../service/auth.service";
import Swal from "sweetalert2";
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
  totalPrice = 0;
  totalQty = 0;
  isLoggedIn = false;
  id?: string;
  city: any[] = [];
  name: any;
  sodienthoai: any;
  email: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastService: ToastrService,
    public OrderService: OrderService,
    private token: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.city = [{id: 1, name: 'Hà Nội'}, {id: 2, name: 'Thái Bình'}, {id: 3, name: 'An Giang'}, {id: 4, name: 'Bà Rịa - Vũng Tàu'}, {id: 5, name: 'Bắc Giang'}
      , {id: 6, name: 'Bắc Kạn'}, {id: 7, name: 'Bạc Liêu'}, {id: 8, name: 'Bắc Ninh'}, {id: 9, name: 'Bến Tre'}, {id: 10, name: 'Bình Định'}, {id: 11, name: 'Bình Dương'}, {id: 12, name: 'Bình Phước'}, {id: 13, name: 'Bình Thuận'}
      , {id: 14, name: 'Cà Mau'}, {id: 15, name: 'Cao Bằng'}, {id: 16, name: 'Đắk Lắk'}, {id: 17, name: 'Đắk Nông'}, {id: 18, name: 'Điện Biên'}, {id: 19, name: 'Đồng Nai'}, {id: 20, name: 'Đồng Tháp'}, {id: 21, name: 'Gia Lai'}
      , {id: 22, name: 'Hà Giang'}, {id: 23, name: 'Hà Nam'}, {id: 24, name: 'Hà Tĩnh'}, {id: 25, name: 'Hải Dương'}, {id: 26, name: 'Hậu Giang'}, {id: 27, name: 'Hòa Bình'}, {id: 28, name: 'Hưng Yên'}, {id: 29, name: 'Khánh Hòa'}
      , {id: 30, name: 'Kiên Giang'}, {id: 31, name: 'Kon Tum'}, {id: 32, name: 'Lai Châu'}, {id: 33, name: 'Lâm Đồng'}, {id: 34, name: 'Lạng Sơn'}, {id: 35, name: 'Lào Cai'}, {id: 36, name: 'Long An'}, {id: 37, name: 'Nam Định'}
      , {id: 38, name: 'Nghệ An'}, {id: 39, name: 'Ninh Bình'}, {id: 40, name: 'Ninh Thuận'}, {id: 41, name: 'Phú Thọ'}, {id: 42, name: 'Quảng Bình'}, {id: 43, name: 'Quảng Nam'}, {id: 44, name: 'Quảng Ngãi'}, {id: 45, name: 'Quảng Ninh'}
      , {id: 46, name: 'Quảng Trị'}, {id: 47, name: 'Sóc Trăng'}, {id: 48, name: 'Sơn La'}, {id: 49, name: 'Tây Ninh'}, {id: 50, name: 'Thái Nguyên'}, {id: 51, name: 'Thanh Hóa'}, {id: 52, name: 'Thừa Thiên Huế'}, {id: 53, name: 'Tiền Giang'}
      , {id: 54, name: 'Trà Vinh'}, {id: 55, name: 'Tuyên Quang'}, {id: 56, name: 'Vĩnh Long'}, {id: 57, name: 'Vĩnh Phúc'}, {id: 58, name: 'Yên Bái'}, {id: 59, name: 'Phú Yên'}, {id: 60, name: 'Cần Thơ'}, {id: 61, name: 'Đà Nẵng'}
      , {id: 62, name: 'Hải Phòng'}, {id: 63, name: 'Thành phố Hồ Chí Minh'}];
    this.listCartProduct();
    this.inputForm = this.formBuilder.group({
      hoten: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(70)]],
      email: ['', [Validators.required, Validators.pattern('^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')]],
      addr: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('(09|03|01[2|6|8|9])+([0-9]{8})\\b')]],
      citys: ['', [Validators.required]],
      type: [],
    });
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.id = user.id;
      this.getInforUser();
    }
  }
  listCartProduct() {
    // this.cartItem = this.cartService.cartItems;
    this.listDataCart = JSON.parse(localStorage.getItem('Cart')!);
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    this.cartService.totalQty.subscribe(
      data => this.totalQty = data
    );
    if (this.listDataCart){
      this.cartService.CartTotal();
    }
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  // tang so luong
  incrementQuantity(theCartItem: any) {
    // this.cartService.addCart(theCartItem);
    this.cartService.addQuantity(theCartItem, this.listDataCart);
    this.cartService.CartTotal();
  }
  // giam so luong
  decrementQuantity(theCartItem: any) {
    this.cartService.decrementQuantity(theCartItem, this.listDataCart);
    this.cartService.CartTotal();
  }

  delete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này không ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.listDataCart.findIndex((i: any) => i.id === id);
        this.listDataCart.splice(index, 1);
        localStorage.setItem('Cart', JSON.stringify(this.listDataCart));
        Swal.fire({
          text: 'Xóa sản phẩm khỏi giỏ hàng thành công !!!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (result.isDismissed) {
        window.location.reload();
      }
    });
  }

  buyNow() {
    if (this.inputForm.invalid) {
      console.log('this.inputForm',this.inputForm);
      this.toastService.error('Vui lòng điền đẩy đủ thông tin');
      return;
    }
    const obj = {
      idUser: this.id,
      namecustom: this.iF.hoten.value,
      email: this.iF.email.value,
      address: this.iF.addr.value + ' - ' + this.iF.citys.value,
      phone: this.iF.phone.value,
      paymentmethod: this.iF.type.value,
      productDetailList: this.listDataCart,
      status: 0,
      totalMonenyOrder: (this.totalPrice / 10) + this.totalPrice,
    };
    this.OrderService.createOrder(obj).subscribe(data => {
      if (data) {
        this.toastService.success('Mua hàng thành công !!!');
        window.localStorage.removeItem('Cart');
        window.location.reload();
      } else {
        this.toastService.error('Lỗi mua hàng không thành công !!!');
      }
    });
  }
  getInforUser() {
    this.ProductService.getInforUser().subscribe(res => {
      if (res) {
        console.log(res);
        this.name = res.fullName;
        this.email = res.email;
        this.sodienthoai = res.sodienthoai;
      }
    });
  }
}
