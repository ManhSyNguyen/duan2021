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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
