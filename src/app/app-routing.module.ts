import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanboComponent } from './components/canbo/canbo.component';
import { LoginComponent } from './components/login/login.component';
import { TrangchuComponent } from './components/trangchu/trangchu.component';
import { DanhSachPhongComponent } from './danhsachphong/danhsachphong.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'trangchu', component: TrangchuComponent},
  {path: 'canbo', component: CanboComponent},
  {path: 'danhsachphong', component: DanhSachPhongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
