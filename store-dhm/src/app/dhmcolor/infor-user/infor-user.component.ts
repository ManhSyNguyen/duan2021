import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-infor-user',
  templateUrl: './infor-user.component.html',
  styleUrls: ['./infor-user.component.css']
})
export class InforUserComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  email?: string;
  sodienthoai?: any;
  constructor(
    private token: TokenStorageService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.productService.getInforUser().subscribe(res => {
        if (res) {
          console.log(res);
          this.username = res.username;
          this.email = res.email;
          this.sodienthoai = res.sodienthoai;
        }
      });
    }
  }
}
