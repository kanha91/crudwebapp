import { Routes } from '@angular/router';
import path from 'path';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


export const routes: Routes = [
   { path:"",redirectTo:'login',pathMatch:'full'},
   { path:"login",component:AuthComponent},
   { path:"dashboard",component:DashboardComponent},
];
