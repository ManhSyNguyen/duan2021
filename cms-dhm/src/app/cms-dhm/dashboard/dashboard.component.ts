import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchForm!: FormGroup;
  maxDate = moment();
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      dateRange: [{startDate: moment().startOf('month'), endDate: moment().endOf('month')}],
    });
  }
  get f() {
    return this.searchForm.controls;
  }
  dateChanged(event: any) {
    const start = event.startDate;
    const end = event.endDate;
    if (!start.isValid() || !end.isValid()) {
      this.f.dateRange.setValue(this.f.dateRange.value);
    } else {
      this.f.dateRange.setValue({startDate: start, endDate : end});
    }
    console.log(this.f.dateRange.value.startDate.format('DD-MM-YYYY'), this.f.dateRange.value.endDate.format('DD-MM-YYYY'));
  }
  ranges() {
    return {
      '7 ngày trước': [moment().subtract(7, 'days'), moment()],
      '14 ngày trước': [moment().subtract(14, 'days'), moment()],
      '30 ngày trước': [moment().subtract(30, 'days'), moment()],
      'Tháng này': [moment().startOf('month'), moment().endOf('month')],
      'Tháng trước': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
    };
  }
}
