import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './dhmcolor/layout/navbar/navbar.component';
import { SidebarComponent } from './dhmcolor/layout/sidebar/sidebar.component';
import { FooterComponent } from './dhmcolor/layout/footer/footer.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { DashboardComponent } from './dhmcolor/dashboard/dashboard.component';
import { ProductComponent } from './dhmcolor/product/product.component';
import { ProductTypeComponent } from './dhmcolor/product-type/product-type.component';
import { CustomerComponent } from './dhmcolor/customer/customer.component';
import { MemberComponent } from './dhmcolor/member/member.component';
import { Page404Component } from './dhmcolor/page404/page404.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
