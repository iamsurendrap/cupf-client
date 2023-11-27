import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { UnderconstructionComponent } from './pages/underconstruction/underconstruction.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', redirectTo :'login',pathMatch:'full'},
    {path:'login',component:LoginComponent, canActivate:[authGuard]},
    {path: 'register', component: RegisterComponent,canActivate:[authGuard] },
    {path:'home', component: HomeComponent, canActivate:[authGuard]},
    {path:'forgotpassword',component: ForgotpasswordComponent},
    {path:'repair', component: UnderconstructionComponent}
];
