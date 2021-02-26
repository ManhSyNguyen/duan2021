import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ProductService } from 'src/app/service/product.service';
=======
import { HttpService } from 'src/http.service';
>>>>>>> hai

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
    private HttpService: HttpService,
>>>>>>> hai
  ) { }

  listProductDetail: any[] = [];
  listProduct: any[] = [];

  ngOnInit(): void {
    this.getListProductDetail();
    this.getListAllProduct();
  }

  getListProductDetail() {
<<<<<<< HEAD
    this.ProductService.getAll().subscribe(data => {
=======
    this.HttpService.getAll().subscribe(data => {
>>>>>>> hai
      this.listProductDetail = data;
    });
  }
  getListAllProduct() {
<<<<<<< HEAD
    this.ProductService.getAllProduct().subscribe(data => {
=======
    this.HttpService.getAllProduct().subscribe(data => {
>>>>>>> hai
      this.listProduct = data;
    });
  }
}
