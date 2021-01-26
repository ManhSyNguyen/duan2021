import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './dhmcolor/layout/navbar/navbar.component';
import { SidebarComponent } from './dhmcolor/layout/sidebar/sidebar.component';
import { FooterComponent } from './dhmcolor/layout/footer/footer.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { DashboardComponent } from './dhmcolor/dashboard/dashboard.component';
import { ProductComponent } from './dhmcolor/products/product/product.component';
import { ProductTypeComponent } from './dhmcolor/types/product-type/product-type.component';
import { CustomerComponent } from './dhmcolor/customers/customer/customer.component';
import { MemberComponent } from './dhmcolor/members/member/member.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { AddProductComponent } from './dhmcolor/products/add-product/add-product.component';
import { EditProductComponent } from './dhmcolor/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './dhmcolor/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './dhmcolor/customers/edit-customer/edit-customer.component';
import { AddMemberComponent } from './dhmcolor/members/add-member/add-member.component';
import { EditMemberComponent } from './dhmcolor/members/edit-member/edit-member.component';


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
    MemberComponent,
    Page404Component,
    AddProductComponent,
    EditProductComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    AddMemberComponent,
    EditMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
