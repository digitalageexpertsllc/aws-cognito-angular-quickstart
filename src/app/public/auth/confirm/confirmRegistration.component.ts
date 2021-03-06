import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserLoginService } from "../../services/user-login.service";
import { UserRegistrationService } from "../../services/user-registration.service";

@Component({
    selector: 'awscognito-angular2-app',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(public router: Router,
        public userService: UserLoginService
    ) { }

    ngOnInit() {
        this.userService.isAuthenticatedObservable()
            .subscribe(isAuthenticated => {
                if (isAuthenticated) {
                    this.userService.logout();
                    this.router.navigate(['/home']);
                }

                this.router.navigate(['/home']);
            });
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './confirmRegistration.html'
})
export class RegistrationConfirmationComponent implements OnInit, OnDestroy {
    confirmationCode: string;
    email: string;
    errorMessage: string;
    private sub: any;

    constructor(public regService: UserRegistrationService, public router: Router, public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.email = params['username'];

        });

        this.errorMessage = null;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onConfirmRegistration() {
        this.errorMessage = null;
        this.regService.confirmRegistration(this.email, this.confirmationCode, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { // error
            this.errorMessage = message;
            console.log("message: " + this.errorMessage);
        } else { // success
            // move to the next step
            console.log("Moving to securehome");
            // this.configs.curUser = result.user;
            this.router.navigate(['']);
        }
    }
}





