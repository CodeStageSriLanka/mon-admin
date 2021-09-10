import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { LightComponent } from './dashboard/light/light.component';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { LockScreenComponent } from './pages/lock-screen/lock-screen.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { Error400Component } from './pages/error400/error400.component';
import { Error403Component } from './pages/error403/error403.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';
import { Error503Component } from './pages/error503/error503.component';


import { UsersComponent } from './users/users.component';
import { BanksComponent } from './banks/banks.component';
import { LoansComponent } from './loans/loans.component';
import { BannerComponent } from './banner/banner.component';
import { AuthGuard } from './auth.guard';
import { AccessComponent } from './access/access.component';
import { BankloansComponent } from './bankloans/bankloans.component';

const routes: Routes = [
                {path: '', redirectTo: 'page-login', pathMatch: 'full' },

				        {
                    path: 'admin',
                    component: AdminComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {path: '', component: LightComponent},
                        {path: 'index', component: LightComponent},
                        {path: 'users', component: UsersComponent},
                        {path: 'banks', component: BanksComponent},
                        {path: 'loans', component: LoansComponent},
                        {path: 'banner', component: BannerComponent},
                        {path: 'access', component: AccessComponent},
                        {path: 'bankloans', component: BankloansComponent},

                    ]
                },

                        {path: 'page-register', component: RegisterComponent},
                        {path: 'page-login', component: LoginComponent},
                        {path: 'page-lock-screen', component: LockScreenComponent},
                        {path: 'page-forgot-password', component: ForgotPasswordComponent},
                        {path: 'page-error-400', component: Error400Component},
                        {path: 'page-error-403', component: Error403Component},
                        {path: '**', component: Error404Component},
                        {path: 'page-error-500', component: Error500Component},
                        {path: 'page-error-503', component: Error503Component},



              ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
