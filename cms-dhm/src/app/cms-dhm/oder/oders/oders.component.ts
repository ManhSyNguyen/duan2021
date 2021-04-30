import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],

})
export class OdersComponent implements OnInit {
  searchForm!: FormGroup;
  listOrder: any[] = [];
  page = 1;
  pageSize = 8;
  constructor(
    private orderService: OrderService,
    private formBuild: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.formBuild.group({
      search: [''],
      status: ['']
    });
    this.searchSku();
  }
  getAll() {
    this.orderService.getAll().subscribe(res => {
      if (res) {
        this.listOrder = res;
        console.log(res);
      }
    });
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  getOrderByStatus(event: any) {
    if (this.sf.status.value) {
      this.orderService.getOrderByStatus(this.sf.status.value).subscribe(res => {
        if (res){
          this.listOrder = res;
          console.log(res);
        }
      });
    }else{
      this.getAll();
    }
  }
  searchSku() {
    if (this.sf.search.value) {
      this.orderService.getOrderBySku(this.sf.search.value).subscribe(res => {
        if (res) {
          console.log(res);
          this.listOrder = [res];
        }
      });
    } else {
      this.getAll();
    }
  }
}
