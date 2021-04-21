import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuild : FormBuilder,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      username: [''],
      sodienthoai: [''],
      email: [''],
      password: [''],
      role: [''],
    });
  }
  get if(): any {
    return this.registerForm.controls;
  }
  onAdd() {
    let obj = {
      username: this.if.username.value,
      sodienthoai: this.if.sodienthoai.value,
      email: this.if.email.value,
      password: this.if.password.value,
      role: [this.if.role.value],
    }
    this.authService.register(obj).subscribe(res => {
      if (res) {
        this.toastService.success("Thêm  thành công !!!");
      }
    })
  }
}
