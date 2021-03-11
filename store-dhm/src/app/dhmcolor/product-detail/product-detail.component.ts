import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pink } from '@material-ui/core/colors';
<<<<<<< HEAD

=======
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
>>>>>>> duong
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
<<<<<<< HEAD

    private ProductService: ProductService,

=======
    private ProductService: ProductService,
    private CartService: CartService,
>>>>>>> duong
    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
  ) { }
  productDetail: any[] = [];
  listProduct: any[] = [];
  ngOnInit(): void {
    this.getProductDetail();
    this.getListAllProduct();
  }

  getProductDetail() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
<<<<<<< HEAD

      this.ProductService.getProductById(productId).subscribe(data => {

=======
      this.ProductService.getProductById(productId).subscribe(data => {
>>>>>>> duong
        console.log(data)
        this.productDetail = data;
      })
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
  addToCart(productDetail: any) {
    let cart = [];
    if (localStorage.getItem('Cart')) {
      cart = JSON.parse(localStorage.getItem('Cart')!);
      cart = [productDetail, ...cart];
    } else {
      cart = [productDetail];
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
  }
  // addToCart(theProduct: Product) {
  //   console.log(`Adding to cart: ${theProduct.nameproduct}, ${theProduct.price}`);
  //   const theCartItem = new CartItem(theProduct);
  //   this.CartService.addToCart(theCartItem);
  // }
}
