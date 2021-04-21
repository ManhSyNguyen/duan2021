import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../../service/size.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../../service/categorys.service";
import {ColorService} from "../../../service/color.service";
import {Router} from "@angular/router";

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

  constructor(
    private sizeService: SizeService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSize();
    this.getCategory();
    this.getColor();
    this.inputForm = this.formBuild.group({
      nameproduct : [''],
      image : [''],
      price : [''],
      decription : [''],
      quantity: [''],
      idcolor: [''],
      idsize: [''],
      status: [1],
      idcategory: ['']
    });
  }
  get if(): any {
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
    let obj = {
      idcategory : this.if.idcategory.value,
      nameproduct : this.if.nameproduct.value,
      price : this.if.price.value,
      image: this.if.image.value,
      decription : this.if.decription.value,
      productDetails: this.listColorandSize,
      status: this.if.status.value ? 1 : 0,
    };
    this.productService.createProduct(obj).subscribe(res => {
      if (res) {
        this.toastService.success("Thêm sản phẩm thành công");
        this.router.navigate(['/products']);
      }
    });
  }
  addColor() {
    let params = {
      idcolor: this.if.idcolor.value,
      idsize: this.if.idsize.value,
      quantity: this.if.quantity.value,
    };
    this.listColorandSize.push(params);
  }
  getColor(text) {
    if (text == '1') {
      return 'Pink';
    }
    if (text == '2') {
      return 'Red';
    }
    if (text == '3') {
      return 'Black';
    }
    if (text == '4') {
      return 'White';
    }
    if (text == '5') {
      return 'Green';
    }
  }
  getSize(text) {
    if (text == '1') {
      return 'XX';
    }
    if (text == '2') {
      return 'XL';
    }
    if (text == '3') {
      return 'M';
    }
    if (text == '4') {
      return 'S';
    }
  }
}
