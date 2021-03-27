import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './cmsdhm/layout/navbar/navbar.component';
import { SidebarComponent } from './cmsdhm/layout/sidebar/sidebar.component';
import { FooterComponent } from './cmsdhm/layout/footer/footer.component';
import { LoginComponent } from './cmsdhm/login/login.component';
import { LayoutComponent } from './cmsdhm/layout/layout.component';
import { DashboardComponent } from './cmsdhm/dashboard/dashboard.component';
import { ProductComponent } from './cmsdhm/products/product/product.component';
import { ProductTypeComponent } from './cmsdhm/types/product-type/product-type.component';
import { CustomerComponent } from './cmsdhm/customers/customer/customer.component';
import { MemberComponent } from './cmsdhm/members/member/member.component';
import { Page404Component } from './cmsdhm/page404/page404.component';
import { AddProductComponent } from './cmsdhm/products/add-product/add-product.component';
import { EditProductComponent } from './cmsdhm/products/edit-product/edit-product.component';
import { AddCustomerComponent } from './cmsdhm/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './cmsdhm/customers/edit-customer/edit-customer.component';
import { AddMemberComponent } from './cmsdhm/members/add-member/add-member.component';
import { EditMemberComponent } from './cmsdhm/members/edit-member/edit-member.component';
import { OderSusscesComponent } from './cmsdhm/oders/oder-sussces/oder-sussces.component';
import { OderWaitingComponent } from './cmsdhm/oders/oder-waiting/oder-waiting.component';


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
    OderSusscesComponent,
    OderWaitingComponent,
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
