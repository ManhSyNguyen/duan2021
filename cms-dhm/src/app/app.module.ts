import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/layout/navbar/navbar.component';
import { SidebarComponent } from './component/layout/sidebar/sidebar.component';
import { FooterComponent } from './component/layout/footer/footer.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/clothes/dashboard/dashboard.component';
import { ProductComponent } from './component/clothes/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
