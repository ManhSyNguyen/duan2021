import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private HttpService: HttpService,
  ) { }

  listProductDetail: any[] = [];
  listProduct: any[] = [];

  ngOnInit(): void {
    this.getListProductDetail();
    this.getListAllProduct();
  }

  getListProductDetail() {
    this.HttpService.getAll().subscribe(data => {
      this.listProductDetail = data;
    });
  }
  getListAllProduct() {
    this.HttpService.getAllProduct().subscribe(data => {
      this.listProduct = data;
    });
  }
}
