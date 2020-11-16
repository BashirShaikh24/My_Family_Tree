import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuhtService } from "src/app/services/auth-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  @ViewChild("loginDetails") userDetails: NgForm;
  signup = true;
  validEmail = false;
  validPassword = false;
  validUserName = false;

  constructor(private authService: AuhtService) {
    this.authService.LogOut();
  }

  loginRegMode(type: string) {
    this.signup = !this.signup;
  }

  getLoginDetails() {
    const emailId = this.userDetails.value.email;
    const password = this.userDetails.value.password;
    const userName = this.userDetails.value.userName;
    if (this.signup) {
      if (emailId && password && userName) {
        this.authService.SignUp(userName, emailId, password);
      } else {
        if (!emailId) {
          this.validEmail = true;
        }
        if (!password) {
          this.validPassword = true;
        }
        if (!userName) {
          this.validUserName = true;
        }
      }
    } else {
      if (emailId && password) {
        this.authService.SignIn(emailId, password);
      } else {
        if (!emailId) {
          this.validEmail = true;
        }
        if (!password) {
          this.validPassword = true;
        }
      }
    }
  }
}
