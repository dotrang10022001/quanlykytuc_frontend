import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CanboComponent } from './components/canbo/canbo.component';
import { TrangchuComponent } from './components/trangchu/trangchu.component';
import { SwiperModule } from 'swiper/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PhongComponent } from './components/phong/phong.component';
import { AdminComponent } from './components/admin/admin.component';
import { ThongtincanhanComponent } from './components/thongtincanhan/thongtincanhan.component';
import { PhananhComponent } from './components/phananh/phananh.component';
import { DichvuComponent } from './components/dichvu/dichvu.component';
import { LoaiphongComponent } from './components/loaiphong/loaiphong.component';
import { DangkyphongComponent } from './components/dangkyphong/dangkyphong.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CanboComponent,
    TrangchuComponent,
    PhongComponent,
    AdminComponent,
    ThongtincanhanComponent,
    PhananhComponent,
    DichvuComponent,
    LoaiphongComponent,
    DangkyphongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
