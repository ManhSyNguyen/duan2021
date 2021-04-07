import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  cartItem: CartItem[] = [];
  listDataCart: any[] = [];
  constructor(
    private token: TokenStorageService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.getProductCart();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }

  logOut(): void {
    this.token.signOut();
    window.location.reload();
  }
  getProductCart() {
      this.listDataCart = JSON.parse(localStorage.getItem("Cart")!);
  }
}
