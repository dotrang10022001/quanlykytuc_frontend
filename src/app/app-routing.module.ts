import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanboComponent } from './components/canbo/canbo.component';
import { LoginComponent } from './components/login/login.component';
import { TrangchuComponent } from './components/trangchu/trangchu.component';
import { PhongComponent } from './components/phong/phong.component';
import { AdminComponent } from './components/admin/admin.component';
import { ThongtincanhanComponent } from './components/thongtincanhan/thongtincanhan.component';
import { PhanAnhComponent } from './components/phananh/phananh.component';
import { DichvuComponent } from './components/dichvu/dichvu.component';
import { LoaiphongComponent } from './components/loaiphong/loaiphong.component';
import { DangkyphongComponent } from './components/dangkyphong/dangkyphong.component';
import { SinhvienComponent } from './components/sinhvien/sinhvien.component';
import { ForumComponent } from './components/forum/forum.component';
import { SudungdichvuComponent } from './components/sudungdichvu/sudungdichvu.component';

const routes: Routes = [
  {path: '', redirectTo: 'trangchu', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'canbo', component: CanboComponent},
  {path: 'phong', component: PhongComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'thongtincanhan', component: ThongtincanhanComponent},
  {path: 'phananh', component: PhanAnhComponent},
  {path: 'dichvu', component: DichvuComponent},
  {path: 'loaiphong', component: LoaiphongComponent},
  {path: 'dangkyphong', component: DangkyphongComponent},
  {path: 'sinhvien', component: SinhvienComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
