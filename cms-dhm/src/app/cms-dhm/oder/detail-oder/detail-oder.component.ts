import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'

@Component({
  selector: 'app-detail-oder',
  templateUrl: './detail-oder.component.html',
  styleUrls: ['./detail-oder.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class DetailOderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
