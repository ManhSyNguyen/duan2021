import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/http.service';

@Component({
  selector: 'app-about-category',
  templateUrl: './about-category.component.html',
  styleUrls: ['./about-category.component.css']
})
export class AboutCategoryComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
    private HttpService: HttpService,
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
    this.HttpService.getAll().subscribe(data => {
      this.listProduct = data;
    });
  }
  getListCategory() {
    this.HttpService.getAllCategory().subscribe(dataCate => {
      this.listCategory = dataCate;
    });
  }

  getProductByIDCategory() {
    this.activeRoute.paramMap.subscribe(params => {
      let id = params.get("id");
      this.HttpService.getProductByCategory(id).subscribe(dataId => {
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
