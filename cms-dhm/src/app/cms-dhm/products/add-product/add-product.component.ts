import { Component, OnInit } from '@angular/core';
import { SizeService } from "../../../service/size.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductService } from "../../../service/product.service";
import { ToastrService } from "ngx-toastr";
import { CategoryService } from "../../../service/categorys.service";
import { ColorService } from "../../../service/color.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { UploadFileServiceService } from 'src/app/service/upload-file-service.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  inputForm!: FormGroup;
  listSize: any[] = [];
  listCategory: any[] = [];
  listColor: any[] = [];
  listColorandSize: any[] = [];
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  errorMsg = '';

  constructor(
    private sizeService: SizeService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private formBuild: FormBuilder,
    private productService: ProductService,
    private uploadService: UploadFileServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSize();
    this.getCategory();
    this.getColor();
    this.inputForm = this.formBuild.group({
      nameproduct: [''],
      image: [''],
      priceProduct: [''],
      decription: [''],
      quantityProduct: [''],
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

  // xử lý ảnh
  onFileChanged(event: any): void {
    this.selectedFiles = event.target.files;
  }


  add() {
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
        let obj = {
          idcategory: this.if.idcategory.value,
          nameproduct: this.if.nameproduct.value,
          priceProduct: this.if.priceProduct.value,
          image: this.currentFile.name,
          decription: this.if.decription.value,
          productDetails: this.listColorandSize,
          status: this.if.status.value ? 1 : 0,
        };
        this.productService.createProduct(obj).subscribe(res => {
          if (res) {
            Swal.fire('Success!', 'Thêm sản phẩm thành công!', 'success')
            this.router.navigate(['/products']);
          }
        });
      }
      this.selectedFiles = undefined;

    }

    // let obj = {
    //   idcategory : this.if.idcategory.value,
    //   nameproduct : this.if.nameproduct.value,
    //   priceProduct : this.if.priceProduct.value,
    //   image: this.if.image.value,
    //   decription : this.if.decription.value,
    //   productDetails: this.listColorandSize,
    //   status: this.if.status.value ? 1 : 0,
    // };
    // this.productService.createProduct(obj).subscribe(res => {
    //   if (res) {
    //     Swal.fire('Success!', 'Thêm sản phẩm thành công!', 'success')
    //     this.router.navigate(['/products']);
    //   }
    // });
  }
  addColor() {
    let params = {
      idcolor: this.if.idcolor.value,
      idsize: this.if.idsize.value,
      quantityProduct: this.if.quantityProduct.value,
    };
    this.listColorandSize.push(params);

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
  xoa() {
    Swal.fire({
      title: 'Xóa sản phẩm?',
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa hộ cái bạn êii !',
      cancelButtonText: 'Bỏ ra bạn êii !',
    }).then((result) => {
      if (result.isConfirmed) {
        let index = 0;
        this.listColorandSize.splice(index, 1);
      }
    });
  }

}
