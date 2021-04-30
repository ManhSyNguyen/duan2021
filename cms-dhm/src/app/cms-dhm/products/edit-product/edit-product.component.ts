import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {SizeService} from "../../../service/size.service";
import {CategoryService} from "../../../service/categorys.service";
import {ColorService} from "../../../service/color.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

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
  listColorSize: any[] = [];
  productDetail: any = [];
  product: any[] = [];
  idcolor: any;
  idsize: any;
  constructor(
    private sizeService : SizeService,
    private colorService : ColorService,
    private categoryService: CategoryService,
    private formBuild : FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProductById();
    this.getSize();
    this.getColor();
    this.getCategory();
    this.inputForm = this.formBuild.group({
      statussize: [1],
      nameproduct : ['', [Validators.required]],
      image : ['', [Validators.required]],
      priceProduct : ['', [Validators.required]],
      decription : ['', [Validators.required]],
      quantityProduct: ['', [Validators.required]],
      idcolor: ['', [Validators.required]],
      idsize: ['', [Validators.required]],
      status: [1],
      idcategory: ['', [Validators.required]]
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
  get iF(): any {
    return this.inputForm.controls;
  }
  xoa(items: any) {
    Swal.fire({
      title: 'Are you sure ?',
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Chắc chắn',
      cancelButtonText: 'Không',
    }).then((result) => {
      if (result.isConfirmed) {
        this.listColorSize = this.listColorSize.filter((i) => i !== items);
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
      idcolor: this.iF.idcolor.value,
      idsize: this.iF.idsize.value,
      quantityProduct: this.iF.quantityProduct.value,
    };
    this.listColorSize.push(params);
  }
  getProductById() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.productService.getProductByIdProduct(productId).subscribe(res => {
        this.product = res;
        this.iF.nameproduct.setValue(res.nameproduct);
        this.iF.priceProduct.setValue(res.priceProduct);
        this.iF.decription.setValue(res.decription);
        this.iF.status.setValue(res.status);
        this.iF.idcategory.setValue(res.category.id);
      });
      this.productService.getProductByIdDetail(productId).subscribe(data => {
          this.productDetail = data;
          this.productDetail.forEach((i: any) => {
            let obj = {
              idcolor : i.color.id , idsize : i.size.id , quantityProduct : i.quantityProduct
            };
            this.listColorSize.push(obj);
        });
          console.log(data);
          this.iF.sku.setValue(data[0].sku);
          this.iF.statussize.setValue(data[0].size.status);
      });
    });
  }
  update() {
    if (this.inputForm.invalid) {
      this.toastService.error("Vui lòng nhập đầy đủ thông tin !!!");
      return;
    }
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      const obj = {
        id: productId,
        idcategory : this.iF.idcategory.value,
        nameproduct : this.iF.nameproduct.value,
        priceProduct : this.iF.priceProduct.value,
        image: this.iF.image.value,
        decription : this.iF.decription.value,
        productDetails: this.listColorSize,
        status: this.iF.status.value ? 1 : 0,
      };
      this.productService.updateProduct(obj, productId).subscribe(res => {
        if (res) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sửa thành công !!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/products']);
        }
      });
    });
  }
}
