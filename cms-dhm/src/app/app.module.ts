import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon'
import {MatStepperModule} from '@angular/material/stepper';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './cmsdhm/layout/navbar/navbar.component';
import { SidebarComponent } from './cmsdhm/layout/sidebar/sidebar.component';
import { FooterComponent } from './cmsdhm/layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './cmsdhm/layout/layout.component';
import { DashboardComponent } from './cmsdhm/dashboard/dashboard.component';
import { ProductComponent } from './cmsdhm/products/product/product.component';
import { ProductTypeComponent } from './cmsdhm/types/product-type/product-type.component';
import { CustomerComponent } from './cmsdhm/customers/customer/customer.component';
import { Page404Component } from './cmsdhm/page404/page404.component';
import { AddProductComponent } from './cmsdhm/products/add-product/add-product.component';
import { EditProductComponent } from './cmsdhm/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './cmsdhm/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './cmsdhm/customers/edit-customer/edit-customer.component';
import { AccountsComponent } from './cmsdhm/account/accounts/accounts.component';
import { EditAccountComponent } from './cmsdhm/account/edit-account/edit-account.component';
import { AddAccountComponent } from './cmsdhm/account/add-account/add-account.component';
import { BoomsComponent } from './cmsdhm/boom/booms/booms.component';
import { LayoutMemberComponent } from './cms-member/layout-member/layout-member.component';
import { FooterMemberComponent } from './cms-member/layout-member/footer-member/footer-member.component';
import { NavbarMemberComponent } from './cms-member/layout-member/navbar-member/navbar-member.component';
import { SidebarMemberComponent } from './cms-member/layout-member/sidebar-member/sidebar-member.component';
import { BillsComponent } from './cms-member/bill/bills/bills.component';
import { OdersComponent } from './cmsdhm/oder/oders/oders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './interceptor/basic-auth-intercepter';
import { ErrorInterceptor } from './interceptor/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    ProductComponent,
    ProductTypeComponent,
    CustomerComponent,
    Page404Component,
    AddProductComponent,
    EditProductComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AccountsComponent,
    EditAccountComponent,
    AddAccountComponent,
    BoomsComponent,
    LayoutMemberComponent,
    FooterMemberComponent,
    NavbarMemberComponent,
    SidebarMemberComponent,
    BillsComponent,
    OdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatStepperModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
