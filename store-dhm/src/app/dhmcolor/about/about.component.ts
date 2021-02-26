import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private HttpService: HttpService,
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
    this.HttpService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }

  getListCategory() {
    this.HttpService.getAllCategory().subscribe(dataCate => {
      this.listCategory = dataCate;
    });
  }

  getProductByIdCategory() {
    this.HttpService.getAllProduct().subscribe(dataId => {
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
