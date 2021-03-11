import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listDataCart: any[] = [];
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
}
