import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { TokenStorageService } from 'src/app/service/token-storage.service';
=======
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/model/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
<<<<<<< HEAD
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

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
=======
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
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e
}
