import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Component } from '@angular/core';

export const routes: Routes = [
    {path: '', redirectTo :'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path: 'register', component: RegisterComponent}
];
