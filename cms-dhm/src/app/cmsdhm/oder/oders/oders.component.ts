import { Component, OnInit } from '@angular/core';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class OdersComponent implements OnInit {
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;

  constructor() {}

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }
}
