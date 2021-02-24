import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listProduct: any[] = [];
  listDataCart: any[] = [];
  tabSelected: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProductCart();
  }
  getProductCart() {
    this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
    console.log(this.listDataCart);
  }
  delete(index: any) {
    this.listDataCart.splice(index);
    localStorage.setItem("Cart", JSON.stringify(this.listDataCart));
  }
  getListAllProduct() {
    this.ProductService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
  onTabChange(event: any) {
    this.tabSelected = event;
    console.log(event);
  }
}
