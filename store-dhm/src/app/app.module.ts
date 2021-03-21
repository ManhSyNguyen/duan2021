import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dhmcolor/home/home.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { HeaderComponent } from './dhmcolor/layout/header/header.component';
import { FooterComponent } from './dhmcolor/layout/footer/footer.component';
import { AboutComponent } from './dhmcolor/about/about.component';
import { SliderComponent } from './dhmcolor/slider/slider.component';
import { ProductDetailComponent } from './dhmcolor/product-detail/product-detail.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { RegisterComponent } from './dhmcolor/register/register.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { CartComponent } from './dhmcolor/cart/cart.component';
import { SlideProductComponent } from './dhmcolor/slide-product/slide-product.component';
import { ContactComponent } from './dhmcolor/contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutCategoryComponent } from './dhmcolor/about-category/about-category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SliderComponent,
    ProductDetailComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    CartComponent,
    SlideProductComponent,
    ContactComponent,
    AboutCategoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
