import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuild.group({
      username: [''],
      sodienthoai: [''],
      email: [''],
      password: [''],
      role: [''],
      status: [],
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
      status: this.if.status.value,
    };
    this.authService.register(obj).subscribe(res => {
      if (res) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Thêm thành công rồi bạn êiii !!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/accounts']);
      }
    });
  }
}
