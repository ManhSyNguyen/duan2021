import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listDataCart: any[] = [];
  cartItem: CartItem[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private ProductService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProductCart();
  }
  getProductCart() {
    this.cartItem = this.cartService.cartItems;
  }
}
