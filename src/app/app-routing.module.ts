import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanboComponent } from './components/canbo/canbo.component';
import { LoginComponent } from './components/login/login.component';
import { TrangchuComponent } from './components/trangchu/trangchu.component';
import { PhongComponent } from './components/phong/phong.component';
import { AdminComponent } from './components/admin/admin.component';
import { ThongtincanhanComponent } from './components/thongtincanhan/thongtincanhan.component';
import { PhananhComponent } from './components/phananh/phananh.component';
import { DichvuComponent } from './components/dichvu/dichvu.component';
import { LoaiphongComponent } from './components/loaiphong/loaiphong.component';
import { DangkyphongComponent } from './components/dangkyphong/dangkyphong.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'canbo', component: CanboComponent},
  {path: 'phong', component: PhongComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'thongtincanhan', component: ThongtincanhanComponent},
  {path: 'phananh', component: PhananhComponent},
  {path: 'dichvu', component: DichvuComponent},
  {path: 'loaiphong', component: LoaiphongComponent},
  {path: 'dangkyphong', component: DangkyphongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
