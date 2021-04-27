import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'

@Component({
  selector: 'app-detail-bill',
  templateUrl: './detail-bill.component.html',
  styleUrls: ['./detail-bill.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DetailBillComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
