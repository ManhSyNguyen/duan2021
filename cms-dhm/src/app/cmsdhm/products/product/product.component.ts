import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProduct : any[] = [];
  constructor(
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.productService.getAll().subscribe(res => {
      if (res) {
        this.listProduct = res;
      }
    });
  }
  getText(text: any) {
    if (text === 0) {
      return 'Hết hàng';
    }else {
      return 'Còn hàng';
    }
  }
}
