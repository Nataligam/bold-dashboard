import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { LayoutComponent } from './shared/components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
