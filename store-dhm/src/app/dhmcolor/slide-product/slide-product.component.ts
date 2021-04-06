import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-slide-product',
  templateUrl: './slide-product.component.html',
  styleUrls: ['./slide-product.component.css']
})
export class SlideProductComponent implements OnInit {
  listProduct: any[] = [];
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.getListAllProduct();
  }

  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
        this.listProduct = data;
    });
  }
}
