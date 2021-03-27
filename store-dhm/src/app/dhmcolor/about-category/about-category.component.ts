import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.css']
})
export class AboutCategoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
    private CartService: CartService,
  ) { }
  idProduct: any;
  listProduct: any[] = [];
  listCategory: any[] = [];
  listProductByIdCate: any[] = [];
  page = 1;
  pageSize = 8;

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
    this.getProductByIDCategory();
  }
  getListProduct() {
    this.ProductService.getAll().subscribe(data => {
      this.listProduct = data;
    });
  }
  getListCategory() {
    this.CategoryService.getAllCategory().subscribe(dataCate => {
      this.listCategory = dataCate;
    });
  }

  getProductByIDCategory() {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get("id");
      this.CategoryService.getProductByCategory(id).subscribe(dataId => {
        this.listProductByIdCate = dataId;
      });
    });
  }
  // addToCart(listProductByIdCate: any) {
  //   let cart = [];
  //   if (localStorage.getItem('Cart')) {
  //     cart = JSON.parse(localStorage.getItem('Cart')!);
  //     cart = [listProductByIdCate, ...cart];
  //   } else {
  //     cart = [listProductByIdCate];
  //   }
  //   localStorage.setItem("Cart", JSON.stringify(cart));
  // }
  addToCart(theProduct: Product) {
    const theCartItem = new CartItem(theProduct);
    this.CartService.addToCart(theCartItem);
  }
}
