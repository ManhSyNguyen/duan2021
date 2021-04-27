import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../service/order.service';

@Component({
  selector: 'app-bill-of-product',
  templateUrl: './bill-of-product.component.html',
  styleUrls: ['./bill-of-product.component.css']
})
export class BillOfProductComponent implements OnInit {
  listOrder: any[] = [];
  productOrder: any;
  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrderByUser();
  }

  getOrderByUser() {
    this.orderService.getOrderByUser().subscribe(res => {
      this.listOrder = res;
    });
  }
}
