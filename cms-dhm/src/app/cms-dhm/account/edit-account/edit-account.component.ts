import { Component, OnInit } from '@angular/core';
import {SizeService} from "../../../service/size.service";
import {ColorService} from "../../../service/color.service";
import {CategoryService} from "../../../service/categorys.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../service/product.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  inputForm! : FormGroup;
  userDetail: any[] = [];
  constructor(
    private formBuild: FormBuilder,
    private toastService: ToastrService,
    private activateRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserById();
    this.inputForm = this.formBuild.group({
      username: [''],
      sodienthoai: [''],
      email: [''],
      status: [],
      password: []
    });
  }
  get if(): any {
    return this.inputForm.controls;
  }

  getUserById() {
    this.activateRoute.paramMap.subscribe(params => {
      let userId = params.get('id');
      this.userService.findUserById(userId).subscribe(data => {
        this.userDetail = data;
        this.if.username.setValue(data.username);
        // tslint:disable-next-line:no-unused-expression
        this.if.username.disable;
        this.if.sodienthoai.setValue(data.sodienthoai);
        this.if.email.setValue(data.email);
        this.if.status.setValue(data.status);
        this.if.password.setValue(data.createdate);
      });
    });
  }
}
