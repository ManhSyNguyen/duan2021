import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";



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
    private router: Router
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
    Swal.fire({
      title: 'Chắc chắn chưa bạn êii ?',
      text: 'Bạn chắc chắn muốn xóa khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa hộ cái bạn êii !',
      cancelButtonText: 'Bỏ ra bạn êii !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(item.id).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công rồi bạn êiii !!',
            showConfirmButton: false,
            timer: 1500
          });
          this.getProduct();
        });
      } else if (result.isDismissed) {
        this.router.navigate(['/products']);
      }
    });
  }
}
