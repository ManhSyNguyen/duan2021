import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './dhmcolor/home/home.component';
import { LayoutComponent } from './dhmcolor/layout/layout.component';
import { HeaderComponent } from './dhmcolor/layout/header/header.component';
import { FooterComponent } from './dhmcolor/layout/footer/footer.component';
import { AboutComponent } from './dhmcolor/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
