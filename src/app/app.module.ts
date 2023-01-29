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
import { PhanAnhComponent } from './components/phananh/phananh.component';
import { DichvuComponent } from './components/dichvu/dichvu.component';
import { LoaiphongComponent } from './components/loaiphong/loaiphong.component';
import { DangkyphongComponent } from './components/dangkyphong/dangkyphong.component';
import { ForumComponent } from './components/forum/forum.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SinhvienComponent } from './components/sinhvien/sinhvien.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SinhvienDialogComponent } from './dialogs/sinhvien-dialog/sinhvien-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { CanboDialogComponent } from './dialogs/canbo-dialog/canbo-dialog.component';
import { DichvuDialogComponent } from './dialogs/dichvu-dialog/dichvu-dialog.component';
import { DangkyphongDialogComponent } from './dialogs/dangkyphong-dialog/dangkyphong-dialog.component';
import { LoaiPhongDialogComponent } from './dialogs/loaiphong-dialog/loaiphong-dialog.component';
import { PhanAnhDialogComponent } from './dialogs/phananh-dialog/phananh-dialog.component';
import { ForumDialogComponent } from './dialogs/forum-dialog/forum-dialog.component';
import { NgxLoadingModule } from "ngx-loading";
import { CreateForumDialogComponent } from './dialogs/create-forum-dialog/create-forum-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CanboComponent,
    TrangchuComponent,
    PhongComponent,
    AdminComponent,
    ThongtincanhanComponent,
    PhanAnhComponent,
    DichvuComponent,
    LoaiphongComponent,
    DangkyphongComponent,
    ForumComponent,
    SinhvienComponent,
    SinhvienDialogComponent,
    CanboDialogComponent,
    DichvuDialogComponent,
    DangkyphongDialogComponent,
    LoaiPhongDialogComponent,
    PhanAnhDialogComponent,
    ForumDialogComponent,
    CreateForumDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
