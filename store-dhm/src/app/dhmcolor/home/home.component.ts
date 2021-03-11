import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

import { ProductService } from 'src/app/service/product.service';


=======
import { ProductService } from 'src/app/service/product.service';
>>>>>>> duong

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
<<<<<<< HEAD

    private ProductService: ProductService,

=======
    private ProductService: ProductService,
>>>>>>> duong
  ) { }

  listProductDetail: any[] = [];
  listProduct: any[] = [];
  page = 1;
  pageSize = 9;

  ngOnInit(): void {
    this.getListProductDetail();
    this.getListAllProduct();
  }

  getListProductDetail() {
<<<<<<< HEAD

    this.ProductService.getAll().subscribe(data => {

=======
    this.ProductService.getAll().subscribe(data => {
>>>>>>> duong
      this.listProductDetail = data;
    });
  }
  getListAllProduct() {
<<<<<<< HEAD

    this.ProductService.getAllProduct().subscribe(data => {

=======
    this.ProductService.getAllProduct().subscribe(data => {
>>>>>>> duong
      this.listProduct = data;
    });
  }
}
