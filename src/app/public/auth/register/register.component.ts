import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatButton,
  MatDivider,
  MatList,
  MatLine,
  MatFormField,
  MatInput
} from '@angular/material';
import { CognitoCallback } from "../../services/cognito.service";
import { UserRegistrationService } from "../../services/user-registration.service";

export class RegistrationUser {
  name: string;
  email: string;
  password: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  industry: string;
  phone: string;
  middleInitial: string;
  familyName: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements CognitoCallback, OnInit {
  registrationUser: RegistrationUser;
  errorMessage: string;
  public userForm: FormGroup;

  constructor(
    public userRegistration: UserRegistrationService,
    public router: Router,
    public form: FormBuilder
  ) { }

  ngOnInit() {
    this.registrationUser = new RegistrationUser();
    this.errorMessage = null;

    this.userForm = this.form.group({
      firstName: [this.registrationUser.name, [Validators.required]],
      middleInitial: [this.registrationUser.middleInitial, []],
      lastName: [this.registrationUser.familyName, [Validators.required]],
      email: [this.registrationUser.email, [Validators.email, Validators.required]],
      password: [this.registrationUser.password, [Validators.required]],
      phone: [this.registrationUser.phone, []],
      industry: [this.registrationUser.industry, []],
      address1: [this.registrationUser.address, [Validators.required]],
      address2: [this.registrationUser.address2, []],
      city: [this.registrationUser.city, [Validators.required]],
      state: [this.registrationUser.state, [Validators.required]],
      zip: [this.registrationUser.zip, [Validators.required]],
    });
  }

  onRegister() {
    this.errorMessage = null;
    if (this.userForm.invalid) {
      return;
    }

    this.userRegistration.register(this.registrationUser, this);
  }

  cognitoCallback(message: string, result: any) {
    if (message != null) { // error
      this.errorMessage = message;
      console.log("result: " + this.errorMessage);
    } else { // success
      // move to the next step
      console.log("redirecting");
      this.router.navigate(['/home/confirmRegistration', result.user.username]);
    }
  }

  getErrorMessage(fc: FormControl) {
    return fc.hasError('required') ? 'You must enter a value' :
      fc.hasError('email') ? 'Not a valid email' :
        '';
  }
}
