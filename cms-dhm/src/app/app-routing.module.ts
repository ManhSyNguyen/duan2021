import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './cmsdhm/customers/customer/customer.component';
import { DashboardComponent } from './cmsdhm/dashboard/dashboard.component';
import { LayoutComponent } from './cmsdhm/layout/layout.component';
import { LoginComponent } from './cmsdhm/login/login.component';
import { MemberComponent } from './cmsdhm/members/member/member.component';
import { Page404Component } from './cmsdhm/page404/page404.component';
import { ProductTypeComponent } from './cmsdhm/types/product-type/product-type.component';
import { ProductComponent } from './cmsdhm/products/product/product.component';
import { AddProductComponent } from './cmsdhm/products/add-product/add-product.component';
import { EditProductComponent } from './cmsdhm/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './cmsdhm/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './cmsdhm/customers/edit-customer/edit-customer.component';
import { AddMemberComponent } from './cmsdhm/members/add-member/add-member.component';
import { EditMemberComponent } from './cmsdhm/members/edit-member/edit-member.component';
import { OderSusscesComponent } from './cmsdhm/oders/oder-sussces/oder-sussces.component';
import { OderWaitingComponent } from './cmsdhm/oders/oder-waiting/oder-waiting.component';


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
