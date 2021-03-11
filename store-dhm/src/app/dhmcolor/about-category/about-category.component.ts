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
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.css']
})
export class AboutCategoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private CategoryService: CategoryService,
    private ProductService: ProductService,
<<<<<<< HEAD

=======
>>>>>>> duong
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
<<<<<<< HEAD

    this.ProductService.getAll().subscribe(data => {

=======
    this.ProductService.getAll().subscribe(data => {
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

  getProductByIDCategory() {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get("id");
<<<<<<< HEAD

      this.CategoryService.getProductByCategory(id).subscribe(dataId => {

=======
      this.CategoryService.getProductByCategory(id).subscribe(dataId => {
>>>>>>> duong
        this.listProductByIdCate = dataId;
      });
    });
  }
  addToCart(listProductByIdCate: any) {
    let cart = [];
    if (localStorage.getItem('Cart')) {
      cart = JSON.parse(localStorage.getItem('Cart')!);
      cart = [listProductByIdCate, ...cart];
    } else {
      cart = [listProductByIdCate];
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
  }
}
