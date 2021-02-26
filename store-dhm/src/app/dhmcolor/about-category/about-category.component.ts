import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { CategoryService } from 'src/app/service/categorys.service';
import { ProductService } from 'src/app/service/product.service';
=======
import { HttpService } from 'src/http.service';
>>>>>>> hai

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.css']
})
export class AboutCategoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
<<<<<<< HEAD
    private CategoryService: CategoryService,
    private ProductService: ProductService,
=======
    private HttpService: HttpService,
>>>>>>> hai
  ) { }
  idProduct: any;
  listProduct: any[] = [];
  listCategory: any[] = [];
  listProductByIdCate: any[] = [];

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
    this.getProductByIDCategory();
  }
  getListProduct() {
<<<<<<< HEAD
    this.ProductService.getAll().subscribe(data => {
=======
    this.HttpService.getAll().subscribe(data => {
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

  getProductByIDCategory() {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get("id");
<<<<<<< HEAD
      this.CategoryService.getProductByCategory(id).subscribe(dataId => {
=======
      this.HttpService.getProductByCategory(id).subscribe(dataId => {
>>>>>>> hai
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
