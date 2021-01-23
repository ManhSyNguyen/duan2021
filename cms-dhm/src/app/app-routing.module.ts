import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './dhmcolor/customers/customer/customer.component';
import { DashboardComponent } from './dhmcolor/dashboard/dashboard.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { MemberComponent } from './dhmcolor/members/member/member.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { ProductTypeComponent } from './dhmcolor/types/product-type/product-type.component';
import { ProductComponent } from './dhmcolor/products/product/product.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'type', component: ProductTypeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'member', component: MemberComponent },
      { path: 'khong-tim-thay-duong-dan', component: Page404Component },
      { path: '**', redirectTo: '/khong-tim-thay-duong-dan' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
