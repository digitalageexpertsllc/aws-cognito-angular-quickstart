import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CognitoCallback } from "../../services/cognito.service";
import { UserLoginService } from "../../services/user-login.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './login.component.html'
})
export class LoginComponent implements CognitoCallback, OnInit {
    email: string;
    password: string;
    errorMessage: string;

    constructor(public router: Router, public userService: UserLoginService) {
        console.log("LoginComponent constructor");
    }

    ngOnInit() {
        this.errorMessage = null;
    }

    onLogin() {
        if (this.email == null || this.password == null) {
            this.errorMessage = "All fields are required";
            return;
        }
        this.errorMessage = null;
        this.userService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
            if (this.errorMessage === 'User is not confirmed.') {
                console.log("redirecting");
                this.router.navigate(['/home/confirmRegistration', this.email]);
            } else if (this.errorMessage === 'User needs to set password.') {
                console.log("redirecting to set new password");
                this.router.navigate(['/home/newPassword']);
            }
        } else { // success
            this.router.navigate(['']);
        }
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['']);
        }
    }
}
