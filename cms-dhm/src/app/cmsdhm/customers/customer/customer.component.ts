import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  listUser: any[] = [];

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userService.findAllUser().subscribe(res => {
      if (res) {
        res.map((x: any) => {
            x.roles.map((o: any) => {
              if (o.namerole === 'ROLE_USER')
              {
                this.listUser.push(x);
              }
            });
          });
        console.log(this.listUser);
      }
    });
  }
  delete(item: any) {

  }
}
