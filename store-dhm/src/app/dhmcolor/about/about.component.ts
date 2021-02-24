import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
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
  addToCart(listProduct: any) {
    let cart = [];
    if (localStorage.getItem('Cart')) {
      cart = JSON.parse(localStorage.getItem('Cart')!);
      cart = [listProduct, ...cart];
    } else {
      cart = [listProduct];
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
  }
}
