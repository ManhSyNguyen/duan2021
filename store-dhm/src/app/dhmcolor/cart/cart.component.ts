import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { ProductService } from 'src/app/service/product.service';
=======
import { HttpService } from 'src/http.service';
>>>>>>> hai

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  listProduct: any[] = [];
  listDataCart: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
<<<<<<< HEAD
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
=======
    private HttpService: HttpService,
  ) { }
  listDataCart: any[] = [];
  qty = 1;

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
  giamSL() {

  }
  tangSL() {

  }
>>>>>>> hai
}
