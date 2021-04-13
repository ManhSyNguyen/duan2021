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
    console.log(iz);
  }
  getProductDetail() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.ProductService.getProductById(productId).subscribe(data => {
        this.colorSizeDetail = data;
        this.productDetail = data[0].product;
        console.log(`object`, this.productDetail)
      })
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
  // addToCart(theProduct: Product) {
  //   if (this.sizeSelect == null) {
  //     this.toastService.error('Vui lòng chọn size quần áo');
  //     return;
  //   }
  //   theProduct.size = this.sizeSelect;
  //   const theCartItem = new CartItem(theProduct);
  //   this.CartService.addToCart(theCartItem);
  //   this.toastService.success('Thêm vào giỏ hàng thành công');
  // }

  addToCart(iz: any) {
    this.colorSizeDetail.forEach(i => {
      if (this.sizeSelect === i.size.namesize) {
        i.quantity++ ;
        this.CartService.addCart(i);
      }
    });
  }
}
