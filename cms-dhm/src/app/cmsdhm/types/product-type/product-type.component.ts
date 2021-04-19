import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../../service/categorys.service";
import {ToastrService} from "ngx-toastr";

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
        this.toastService.success("Thêm thương hiệu thành công !!!");
        this.getCategory();
      }
    });
  }
  delete(id: any) {
      this.Category.deleteNew(id).subscribe(res => {
          this.toastService.success("Xóa thành công !!!");
          this.getCategory();
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
        this.toastService.success("Sủa thương hiệu thành công !!!");
        this.getCategory();
      }
    });
  }
}
