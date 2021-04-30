import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductService } from "../../../service/product.service";
import { ToastrService } from "ngx-toastr";
import { SizeService } from "../../../service/size.service";
import { CategoryService } from "../../../service/categorys.service";
import { ColorService } from "../../../service/color.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { UploadFileServiceService } from 'src/app/service/upload-file-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';
  nameFiles = null;
  constructor(
    private sizeService: SizeService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private toastService: ToastrService,
    private uploadService: UploadFileServiceService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getProductById();
    this.getSize();
    this.getColor();
    this.getCategory();
    this.inputForm = this.formBuild.group({
      nameproduct: [''],
      sku: [''],
      image: [''],
      priceProduct: [''],
      decription: [''],
      quantityProduct: [''],
      idcolor: [''],
      idsize: [''],
      status: [],
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
  xoa() {
    Swal.fire({
      title: 'Chắc chắn chưa bạn êii ?',
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa hộ cái bạn êii !',
      cancelButtonText: 'Bỏ ra bạn êii !',
    }).then((result) => {
      if (result.isConfirmed) {
        let index = 1;
        this.listColorSize.splice(index, 1);
      }
    });
  }
  addColor() {
    let params = {
      idcolor: this.if.idcolor.value,
      idsize: this.if.idsize.value,
      quantityProduct: this.if.quantityProduct.value,
    };
    this.listColorSize.push(params);
  }
  getProductById() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');
      this.productService.getProductByIdProduct(productId).subscribe(res => {
        this.nameFiles=   res.image;
        this.product = res;
        this.if.nameproduct.setValue(res.nameproduct);
        this.if.priceProduct.setValue(res.priceProduct);
        this.if.decription.setValue(res.decription);
        this.if.status.setValue(res.status);
        this.if.idcategory.setValue(res.category.id);
      });
      this.productService.getProductByIdDetail(productId).subscribe(data => {
        this.productDetail = data;
        this.productDetail.forEach((i: any) => {
          let obj = {
            idcolor: i.color.id, idsize: i.size.id, quantityProduct: i.quantityProduct
          };
          this.listColorSize.push(obj);
        });
        this.if.sku.setValue(data[0].sku);
      });
    });
  }

  // xử lý ảnh
  onFileChanged(event: any): void {
    this.selectedFiles = event.target.files;
  }

  update() {
    this.activateRoute.paramMap.subscribe(params => {
      let productId = params.get('id');

      this.errorMsg = '';
      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (file) {
          this.currentFile = file;
          this.uploadService.upload(this.currentFile).subscribe(
            (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                console.log(Math.round(100 * event.loaded / event.total));

              } else if (event instanceof HttpResponse) {
                this.message = event.body.responseMessage;
              }
            },
            (err: any) => {
              console.log(err);

              if (err.error && err.error.responseMessage) {
                this.errorMsg = err.error.responseMessage;
              } else {
                this.errorMsg = 'Xẩy rả lỗi khi upload file có thể đã tồn tại hoặc không có !';
              }

              this.currentFile = undefined;
            });
          const obj = {
            id: productId,
            idcategory: this.if.idcategory.value,
            nameproduct: this.if.nameproduct.value,
            priceProduct: this.if.priceProduct.value,
            image: this.currentFile.name,
            decription: this.if.decription.value,
            productDetails: this.listColorSize,
            status: this.if.status.value ? 1 : 0,
          };
          this.productService.updateProduct(obj, productId).subscribe(res => {
            if (res) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sửa thành công rồi bạn êiii !!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigate(['/products']);
            }
          });
        }
      }
    })
}
}
