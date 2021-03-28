import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
    private CartService: CartService,
    ) { }
    listProduct: any[] = [];
    listProductCart: any = {};
    listCategory: any[] = [];
    listIdCategory: any[] = [];
    page = 1;
    pageSize = 8;
  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
    this.getProductByIdCategory();
  }
  getListProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }

  getListCategory() {
    this.CategoryService.getAllCategory().subscribe(dataCate => {
      this.listCategory = dataCate;
    });
  }

  getProductByIdCategory() {
    this.ProductService.getAllProduct().subscribe(dataId => {
      this.listIdCategory = dataId;
    });
  }
  addToCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.CartService.addToCart(theCartItem);
  }
}
