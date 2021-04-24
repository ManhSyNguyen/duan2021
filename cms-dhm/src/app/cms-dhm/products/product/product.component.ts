import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listProduct : any[] = [];
  page = 1;
  pageSize = 6;
  constructor(
    private productService: ProductService,
    private toastService: ToastrService,
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    this.productService.getAll().subscribe(res => {
      if (res) {
        this.listProduct = res;
      }
    });
  }
  getText(text: any) {
    if (text === 0) {
      return 'Hết hàng';
    }else {
      return 'Còn hàng';
    }
  }
  delete(item: any) {
    let conf = confirm("Bạn có muốn xóa sản phẩm này không ?????");
    if (conf) {
      this.productService.deleteProduct(item.id).subscribe(res => {
          this.toastService.success("Xóa thành công");
          this.getProduct();
      });
    }
  }
  update(item: any) {

  }
}
