import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarComponent,
    LayoutComponent,
    HttpClientModule
],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
