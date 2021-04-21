import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './cmsdhm/customers/customer/customer.component';
import { DashboardComponent } from './cmsdhm/dashboard/dashboard.component';
import { LayoutComponent } from './cmsdhm/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './cmsdhm/page404/page404.component';
import { ProductTypeComponent } from './cmsdhm/types/product-type/product-type.component';
import { ProductComponent } from './cmsdhm/products/product/product.component';
import { AddProductComponent } from './cmsdhm/products/add-product/add-product.component';
import { EditProductComponent } from './cmsdhm/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './cmsdhm/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './cmsdhm/customers/edit-customer/edit-customer.component';
import { AccountsComponent } from './cmsdhm/account/accounts/accounts.component';
import { AddAccountComponent } from './cmsdhm/account/add-account/add-account.component';
import { EditAccountComponent } from './cmsdhm/account/edit-account/edit-account.component';
import { BoomsComponent } from './cmsdhm/boom/booms/booms.component';
import { LayoutMemberComponent } from './cms-member/layout-member/layout-member.component';
import { BillsComponent } from './cms-member/bills/bills.component';
import { OdersComponent } from './cmsdhm/oder/oders/oders.component';
import { DetailOderComponent} from './cmsdhm/oder/detail-oder/detail-oder.component'
import { AddBillComponent } from './cms-member/add-bill/add-bill.component';
import { DetailBillComponent } from './cms-member/detail-bill/detail-bill.component';
import {AdminGuard} from './cmsdhm/admin/admin.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, canActivate: [AdminGuard],
    children: [
      { path: '',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      //product
      { path: 'products',
        component: ProductComponent,
        canActivate: [AdminGuard]
      },
      { path: 'add-product', component: AddProductComponent, canActivate: [AdminGuard] },
      { path: 'edit-product/:id', component: EditProductComponent, canActivate: [AdminGuard] },
      //type
      { path: 'type', component: ProductTypeComponent, canActivate: [AdminGuard] },
      //customer
      { path: 'customer', component: CustomerComponent, canActivate: [AdminGuard] },
      { path: 'add-customer', component: AddCustomerComponent, canActivate: [AdminGuard] },
      { path: 'edit-customer', component: EditCustomerComponent, canActivate: [AdminGuard] },
      //account
      { path: 'accounts', component: AccountsComponent, canActivate: [AdminGuard] },
      { path: 'add-account', component: AddAccountComponent, canActivate: [AdminGuard] },
      { path: 'edit-account', component: EditAccountComponent, canActivate: [AdminGuard] },
      //oder
      {path: 'oders', component:OdersComponent, canActivate: [AdminGuard]},
      {path:'detail-order', component:DetailOderComponent, canActivate: [AdminGuard]},
      //boom
      { path: 'booms', component: BoomsComponent, canActivate: [AdminGuard] },
    ]
  },
  // Member
  {
    path:'member', component: LayoutMemberComponent, canActivate: [AdminGuard],
    children:[
      {path:'bills', component:BillsComponent, canActivate: [AdminGuard]},
      {path:'bills/detail-bill', component:DetailBillComponent, canActivate: [AdminGuard]},
      {path:'add-bill', component:AddBillComponent, canActivate: [AdminGuard]},
    ]
  },
  { path: 'khong-tim-thay-duong-dan', component: Page404Component },
  { path: '**', redirectTo: '/khong-tim-thay-duong-dan' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
