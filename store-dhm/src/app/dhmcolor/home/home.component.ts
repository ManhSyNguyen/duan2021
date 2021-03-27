import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private ProductService: ProductService,
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
    this.ProductService.getAll().subscribe(data => {
      this.listProductDetail = data;
    });
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
}
