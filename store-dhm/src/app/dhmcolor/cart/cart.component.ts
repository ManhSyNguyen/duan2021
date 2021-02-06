import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private activeRoute: ActivatedRoute,
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
}
