import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../service/order.service";

@Component({
  selector: 'app-detail-oder',
  templateUrl: './detail-oder.component.html',
  styleUrls: ['./detail-oder.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DetailOderComponent implements OnInit {
  listOrderBySku: any[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderBySku();
  }
  getOrderBySku() {
    this.activeRoute.paramMap.subscribe(param => {
      let sku = param.get('sku');
      this.orderService.getOrderBySku(sku).subscribe(res => {
        this.listOrderBySku = res.orderProductDetails;
        console.log(this.listOrderBySku);
      });
    });
  }
}
