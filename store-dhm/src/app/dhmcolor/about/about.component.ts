import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';
=======
import { HttpService } from 'src/http.service';
>>>>>>> hai

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
    private HttpService: HttpService,
>>>>>>> hai
  ) { }

  listProduct: any[] = [];
  listProductCart: any = {};
  listCategory: any[] = [];
  listIdCategory: any[] = [];
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
    this.getProductByIdCategory();
  }
  getListProduct() {
<<<<<<< HEAD
    this.ProductService.getAllProduct().subscribe(data => {
=======
    this.HttpService.getAllProduct().subscribe(data => {
>>>>>>> hai
      this.listProduct = data;
    });
  }

  getListCategory() {
<<<<<<< HEAD
    this.CategoryService.getAllCategory().subscribe(dataCate => {
=======
    this.HttpService.getAllCategory().subscribe(dataCate => {
>>>>>>> hai
      this.listCategory = dataCate;
    });
  }

  getProductByIdCategory() {
<<<<<<< HEAD
    this.ProductService.getAllProduct().subscribe(dataId => {
=======
    this.HttpService.getAllProduct().subscribe(dataId => {
>>>>>>> hai
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

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.getListProduct();
  }
}
