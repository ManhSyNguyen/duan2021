import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {SizeService} from "../../../service/size.service";
import {CategoryService} from "../../../service/categorys.service";
import {ColorService} from "../../../service/color.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  inputForm!: FormGroup;
  listSize: any[] = [];
  listCategory: any[] = [];
  listColor: any[] = [];
  colorSizeDetail: any[] = [];
  productDetail: any = [];
  constructor(
    private sizeService : SizeService,
    private colorService : ColorService,
    private categoryService: CategoryService,
    private formBuild : FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private activateRoute: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.getProductById();
    this.getSize();
    this.getColor();
    this.getCategory();
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
  get if(): any {
    return this.inputForm.controls;
  }
  getProductById() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.productService.getProductById(productId).subscribe(data => {
        this.productDetail = data;
        console.log(`object`, this.productDetail);
        this.if.nameproduct.setValue(data[0].product.nameproduct);
        this.if.price.setValue(data[0].product.price);
        this.if.decription.setValue(data[0].product.decription);
        this.if.idcolor.setValue(data[0].color.id);
        this.if.idsize.setValue(data[0].size.id);
        this.if.status.setValue(data[0].status);
      });
    });
  }
}
