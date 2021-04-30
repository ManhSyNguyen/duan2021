import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../../service/size.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/categorys.service";
import {ColorService} from "../../../service/color.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid' ;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  inputForm! : FormGroup;
  listSize : any[] = [];
  listCategory: any[] = [];
  listColor: any[] = [];
  listColorandSize: any[] = [];
  selectedItem: any;

  constructor(
    private sizeService: SizeService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getSize();
    this.getCategory();
    this.getColor();
    this.inputForm = this.formBuild.group({
      nameproduct : ['', [Validators.required]],
      image : ['', [Validators.required]],
      priceProduct : ['', [Validators.required]],
      decription : ['', [Validators.required]],
      quantityProduct: ['', [Validators.required]],
      idcolor: ['', [Validators.required]],
      idsize: ['', [Validators.required]],
      status: [0],
      idcategory: ['', [Validators.required]]
    });
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  getSize() {
    this.sizeService.getAll().subscribe(res => {
      if (res) {
       this.listSize = res;
      }
    });
  }
  getColor() {
    this.colorService.getAll().subscribe(res => {
      if (res) {
        this.listColor = res;
      }
    });
  }
  getCategory() {
    this.categoryService.getAll().subscribe(res => {
      if (res) {
        this.listCategory = res;
      }
    });
  }
  add() {
    if (this.inputForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin !!!");
      return;
    }
    let obj = {
      idcategory : this.iF.idcategory.value,
      nameproduct : this.iF.nameproduct.value,
      priceProduct : this.iF.priceProduct.value,
      image: this.iF.image.value,
      decription : this.iF.decription.value,
      productDetails: this.listColorandSize,
      status: this.iF.status.value ? 1 : 0,
    };
    this.productService.createProduct(obj).subscribe(res => {
      if (res) {
        Swal.fire('Success!', 'Thêm sản phẩm thành công!', 'success')
        this.router.navigate(['/products']);
      }
    });
  }
  addColor() {
    if (this.iF.idcolor.value == "") {
      this.toastService.error("Vui lòng chọn size !!");
      return;
    }
    if (this.iF.idsize.value == "") {
      this.toastService.error("Vui lòng chọn màu !!");
      return;
    }
    if (this.iF.quantityProduct.value == "") {
      this.toastService.error("Vui lòng chọn số lượng !!");
      return;
    }
    let params = {
      id : uuid(),
      idcolor: this.iF.idcolor.value,
      idsize: this.iF.idsize.value,
      quantityProduct: this.iF.quantityProduct.value,
    };
    this.listColorandSize.push(params);
    console.log(this.listColorandSize);

  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  getTextColor(text: any) {
    if (text === '1') {
      return "Pink";
    }
    if (text === '2') {
      return "Red";
    }
    if (text === '3') {
      return "Black";
    }
    if (text === '4') {
      return "White";
    }
    if (text === '5') {
      return "Green";
    }
  }
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  getTextSize(text: any) {
    if (text === '1') {
      return "S";
    }
    if (text === '2') {
      return "M";
    }
    if (text === '3') {
      return "L";
    }
    if (text === '4') {
      return "XL";
    }
    if (text === '5') {
      return "XX";
    }
  }
  xoa(items: any) {
    Swal.fire({
      title: 'Are you sure',
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listColorandSize = this.listColorandSize.filter((i) => i !== items);
      }
    });
  }
}
