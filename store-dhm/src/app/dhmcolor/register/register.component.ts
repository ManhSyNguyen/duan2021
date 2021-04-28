import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  regisForm!: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.regisForm = this.formBuild.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      sodienthoai: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get rf(): any {
    return this.regisForm.controls;
  }
  register() {
    if (this.regisForm.invalid) {
      this.toastService.error('Bạn hãy nhập đầy đủ thông tin để đăng kí !!!');
      return;
    }
    let obj = {
      email: this.rf.email.value,
      username: this.rf.username.value,
      sodienthoai: this.rf.sodienthoai.value,
      password: this.rf.password.value,
      role: [''],
    };
    this.authService.register(obj).subscribe((res) => {
      console.log('res :>> ', res);
      if (res) {
        this.toastService.success('Đãng kí tài khoản thành công');
        this.router.navigate(['login']);
      } else {
        console.log('res.message :>> ', res.message);
      }
    });
  }
}
