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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutCategoryComponent } from './dhmcolor/about-category/about-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
<<<<<<< HEAD
import { authInterceptorProviders } from './dhmcolor/interceptor/basic-auth-intercepter';
import { ErrorInterceptor } from './dhmcolor/interceptor/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
=======
import { ToastrModule } from 'ngx-toastr';
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e
=======
import { ToastrModule } from 'ngx-toastr';
import { authInterceptorProviders } from './dhmcolor/interceptor/basic-auth-intercepter';
import { ErrorInterceptor } from './dhmcolor/interceptor/error.interceptor';
>>>>>>> duong

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
<<<<<<< HEAD
<<<<<<< HEAD
    HttpClientModule,
    BrowserAnimationsModule,

=======
    ToastrModule.forRoot(),
>>>>>>> 21a4fa5fcb96ff71dd743660a07b8ad2c26a1c5e
=======
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: false,
      progressBar: false
    }),
>>>>>>> duong
  ],
  providers: [authInterceptorProviders,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
