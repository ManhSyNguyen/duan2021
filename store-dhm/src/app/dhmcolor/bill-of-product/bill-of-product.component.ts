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
    this.getDataOrder();
  }
  getDataOrder() {
    this.orderService.getAll().subscribe(res => {
      if (res) {
        res.map((i: any) => {
          const data = i.orderProductDetails;
          data.map((el: any) => {
            this.productOrder = el;
            console.log(this.productOrder);
            this.listOrder.push(this.productOrder);
          });
        });
      }
    });
  }
}
