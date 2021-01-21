import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './dhmcolor/about/about.component';
import { HomeComponent } from './dhmcolor/home/home.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { LoginComponent } from './dhmcolor/login/login.component';
import { Page404Component } from './dhmcolor/page404/page404.component';
import { ProductDetailComponent } from './dhmcolor/product-detail/product-detail.component';
import { RegisterComponent } from './dhmcolor/register/register.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'product-detail', component: ProductDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'khong-tim-thay-duong-dan', component: Page404Component },
  { path: '**', redirectTo: '/khong-tim-thay-duong-dan' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
