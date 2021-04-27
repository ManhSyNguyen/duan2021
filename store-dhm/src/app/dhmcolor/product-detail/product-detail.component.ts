import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  products: Product[] = [];
  productDetail: any = [];
  listProduct: any[] = [];
  colorSizeDetail: any[] = [];
  sizeSelect: any;
  detailProduct: any;

  constructor(
    private ProductService: ProductService,
    private CartService: CartService,
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
    public toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getProductDetail();
    this.getListAllProduct();
  }
  selectSize(iz: any) {
    this.sizeSelect = iz.size.namesize;
    this.detailProduct = iz;
    console.log("chọn size",iz);
  }
  getProductDetail() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.ProductService.getProductById(productId).subscribe(data => {
        this.colorSizeDetail = data;
        this.productDetail = data[0].product;
        console.log(this.productDetail);
      });
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
   kiemtravitri( list: any, obj: CartItem) {
    debugger
    for (let i = 0 ; i < list.length; i++){
      if (list[i].id === obj.id && list[i].size.id === obj.size.id)
      {
        return i;
      }
    }
    return -1;
  }
  addToCart() {
    debugger
    const listDataCart = JSON.parse(localStorage.getItem("Cart")!);
    const conf = confirm("Bạn có muốn mua sản phẩm này không ??");
    if (conf) {
          if (listDataCart === null) {
            this.CartService.addCart(this.detailProduct);
            this.toastService.success("Thêm giỏ hàng thành công");
          }else {
            const i = this.kiemtravitri(listDataCart, this.detailProduct);
            if (i === -1){
              this.CartService.addCart(this.detailProduct);
            }else {
              listDataCart.map((e: any) => {
                debugger
                if (e.id === listDataCart[i].id){
                  // tslint:disable-next-line:no-unused-expression label-position
                  priceProductDetail : listDataCart[i].priceProductDetail++;
                }
              });
              console.log("listDataCart[i]", listDataCart);
              localStorage.setItem("Cart", JSON.stringify(listDataCart));
              this.toastService.success("Thêm giỏ hàng thành công");
            }
      }
    }
  }
}
