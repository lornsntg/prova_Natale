import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
Login

export const routes: Routes = [
  { path: 'login', component: Login},
  { path: 'home', component: Home },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirect alla login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }