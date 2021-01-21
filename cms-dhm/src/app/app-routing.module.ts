import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './dhmcolor/customer/customer.component';
import { DashboardComponent } from './dhmcolor/dashboard/dashboard.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { MemberComponent } from './dhmcolor/member/member.component';
import { ProductTypeComponent } from './dhmcolor/product-type/product-type.component';
import { ProductComponent } from './dhmcolor/product/product.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductComponent },
      { path: 'type', component: ProductTypeComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'member', component: MemberComponent }
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
