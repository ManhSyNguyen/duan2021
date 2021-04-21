import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/oder.service";
import {FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  styleUrls: ['./oders.component.css'],
})
export class OdersComponent implements OnInit {
  searchForm! : FormGroup;
  listOrder: any[] = [];
  constructor(
    private orderService: OrderService,
    private formBuild: FormBuilder
  ) {}
  ngOnInit() {
    this.getAll();
    this.searchForm = this.formBuild.group({
      search: [''],
      status: ['']
    });
  }
  getAll() {
    this.orderService.getAll().subscribe(res => {
      if (res) {
        this.listOrder = res;
      }
    });
  }
  getText(text) {
    if (text == '0'){
      return 'Chờ xác nhận';
    }
    if (text == '1'){
      return 'Chờ lấy hàng';
    }
    if (text == '2'){
      return 'Đang giao';
    }
    if (text == '3'){
      return 'Thành công';
    }
    if (text == '4'){
      return 'Hủy';
    }
  }
  get sf(): any {
    return this.searchForm.controls;
  }
  getOrderByStatus(event: any) {
    if (this.sf.status.value) {
      this.orderService.getOrderByStatus(this.sf.status.value).subscribe(res => {
        if (res){
          this.listOrder = res;
        }
      });
    }else{
      this.getAll();
    };
  }
}