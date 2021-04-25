import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/categorys.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  inputForm!: FormGroup;
  listCategory: any[] = [];
  itemSelected: any;
  constructor(
    public formBuilder: FormBuilder,
    public Category: CategoryService,
    public toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      decription: ['', [Validators.required]]
    });
    this.getCategory();
  }
  get iF(): any {
    return this.inputForm.controls;
  }
  getCategory() {
    this.Category.getAll().subscribe(res => {
      if (res) {
        this.listCategory = res;
      }
    });
  }

  add() {
    if (this.inputForm.invalid) {
      this.toastService.error("Hãy nhập đầy đủ thông tin !!!");
      return;
    }
    let obj = {
      name : this.iF.name.value,
      decription: this.iF.decription.value
    };
    this.Category.createCategory(obj).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm thành công rồi bạn êiii !!',
          showConfirmButton: false,
          timer: 1500
        });
        this.clear();
        this.getCategory();
      }
    });
  }
  delete(id: any) {
    Swal.fire({
      title: 'Chắc chắn chưa bạn êii ?',
      text: 'Bạn chắc chắn muốn xóa chi tiết khỏi danh sách!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa hộ cái bạn êii !',
      cancelButtonText: 'Bỏ ra bạn êii !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Category.deleteNew(id).subscribe(res => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Xóa thành công rồi bạn êiii !!',
            showConfirmButton: false,
            timer: 1500
          });
          this.getCategory();
        });
      }
    });
  }
  update(item: any) {
    this.itemSelected = item;
    this.iF.name.setValue(item.name);
    this.iF.decription.setValue(item.decription);
  }

  edit() {
    let obj = {
      name : this.iF.name.value,
      decription : this.iF.decription.value
    };
    this.Category.updateNew(obj, this.itemSelected.id).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sửa thành công rồi bạn êiii !!',
          showConfirmButton: false,
          timer: 1500
        });
        this.clear();
        this.getCategory();
      }
    });
  }
  clear() {
    this.iF.name.setValue('');
    this.iF.decription.setValue('');
  }
}
