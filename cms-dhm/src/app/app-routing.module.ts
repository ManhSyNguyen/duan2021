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
import { AddProductComponent } from './dhmcolor/products/add-product/add-product.component';
import { EditProductComponent } from './dhmcolor/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './dhmcolor/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './dhmcolor/customers/edit-customer/edit-customer.component';
import { AddMemberComponent } from './dhmcolor/members/add-member/add-member.component';
import { EditMemberComponent } from './dhmcolor/members/edit-member/edit-member.component';
import { OderSusscesComponent } from './dhmcolor/oders/oder-sussces/oder-sussces.component';
import { OderWaitingComponent } from './dhmcolor/oders/oder-waiting/oder-waiting.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '', component: DashboardComponent },
      //product
      { path: 'products', component: ProductComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'edit-product', component: EditProductComponent },
      //type
      { path: 'type', component: ProductTypeComponent },
      //customer
      { path: 'customer', component: CustomerComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'edit-customer', component: EditCustomerComponent },
      //member
      { path: 'member', component: MemberComponent },
      { path: 'add-member', component: AddMemberComponent },
      { path: 'edit-member', component: EditMemberComponent },
      //oder
      { path: 'oder-sussces', component: OderSusscesComponent },
      { path: 'oder-waiting', component: OderWaitingComponent },

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
