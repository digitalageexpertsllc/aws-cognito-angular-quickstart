import { NavbarModule } from './../navbar/navbar.module';
import { LoginComponent } from './auth/login/login.component';
import { LandingHomeComponent } from './landing-home/landing-home.component';
import { HomeComponent } from './home/home.component';
import {
  MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatSnackBarModule, MatIconModule, MatDialogModule,
  MatDividerModule, MatListModule, MatLineModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResendCodeComponent } from './../public/auth/resend/resendCode.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent, RegistrationConfirmationComponent } from './auth/confirm/confirmRegistration.component';
import { ForgotPasswordStep1Component, ForgotPassword2Component } from './auth/forgot/forgotPassword.component';
import { NewPasswordComponent } from './auth/newpassword/newpassword.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { AwsUtil } from './services/aws.service';
import { CognitoUtil } from './services/cognito.service';
import { UserLoginService } from './services/user-login.service';
import { UserRegistrationService } from './services/user-registration.service';
import { UserParametersService } from './services/user-parameters.service';
import { CloudWatchLogsService } from './services/cloudwatch.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatLineModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    NavbarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ForgotPasswordStep1Component,
    ForgotPassword2Component,
    HomeComponent,
    LandingHomeComponent,
    LoginComponent,
    LogoutComponent,
    NewPasswordComponent,
    RegisterComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent
  ],
  exports: [
    HomeComponent,
    ForgotPasswordStep1Component,
    ForgotPassword2Component,
    LandingHomeComponent,
    LoginComponent,
    LogoutComponent,
    NewPasswordComponent,
    RegisterComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent,
  ],
  providers: [
    AwsUtil,
    CloudWatchLogsService,
    CognitoUtil,
    UserLoginService,
    UserParametersService,
    UserRegistrationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class PublicModule { }
