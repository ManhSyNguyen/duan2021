import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../../service/size.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  listSize : any[] = [];
  constructor(
    private sizeService : SizeService
  ) { }

  ngOnInit(): void {
    this.getSize();
  }
  getSize() {
    this.sizeService.getAll().subscribe(res => {
      if (res) {
       this.listSize = res;
      }
    })
  }
}
