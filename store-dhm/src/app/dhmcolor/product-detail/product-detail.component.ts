import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pink } from '@material-ui/core/colors';

import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(

    private ProductService: ProductService,

    private route: ActivatedRoute,
    private activateRoute: ActivatedRoute,
  ) { }
  productDetail: any[] = [];
  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');

      this.ProductService.getProductById(productId).subscribe(data => {

        console.log(data)
        this.productDetail = data;
      })
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

}
