import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CanboComponent } from './components/canbo/canbo.component';
import { TrangchuComponent } from './components/trangchu/trangchu.component';
import { DanhSachPhongComponent } from './components/danhsachphong/danhsachphong.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CanboComponent,
    TrangchuComponent,
    DanhSachPhongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
