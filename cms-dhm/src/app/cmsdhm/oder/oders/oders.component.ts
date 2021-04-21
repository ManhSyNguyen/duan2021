import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],

})
export class OdersComponent implements OnInit {
  listOrder: any[] = [];
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.getAll();
  }
  getAll() {
    this.orderService.getAll().subscribe(res => {
      if (res) {
        this.listOrder = res;
      }
    });
  }
}
