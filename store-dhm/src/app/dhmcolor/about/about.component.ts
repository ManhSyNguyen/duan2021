import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD

import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';

=======
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';
>>>>>>> duong

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
<<<<<<< HEAD

    private CategoryService: CategoryService,
    private ProductService: ProductService,

=======
    private CategoryService: CategoryService,
    private ProductService: ProductService,
>>>>>>> duong
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
<<<<<<< HEAD

    this.ProductService.getAllProduct().subscribe(data => {

=======
    this.ProductService.getAllProduct().subscribe(data => {
>>>>>>> duong
      this.listProduct = data;
    });
  }

  getListCategory() {
<<<<<<< HEAD

    this.CategoryService.getAllCategory().subscribe(dataCate => {

=======
    this.CategoryService.getAllCategory().subscribe(dataCate => {
>>>>>>> duong
      this.listCategory = dataCate;
    });
  }

  getProductByIdCategory() {
<<<<<<< HEAD

    this.ProductService.getAllProduct().subscribe(dataId => {

=======
    this.ProductService.getAllProduct().subscribe(dataId => {
>>>>>>> duong
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
