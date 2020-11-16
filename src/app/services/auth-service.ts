import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { ThemeService } from "./theme.service";
import { DOCUMENT } from "@angular/common";
import { environment } from "../../environments/environment";

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable()
export class AuhtService {
  userData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  userDetails: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private themeService: ThemeService,
    private router: Router
  ) {}

  SignUp(userName: string, email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        var user = firebase.auth().currentUser;
        user
          .updateProfile({
            displayName: userName,
          })
          .then(() => {
            this.userDetails = result.user;
            this.userDetails.themeColor = environment.defaultTheme;
            this.themeService.setThemeColorService(
              environment.defaultTheme,
              user.uid
            );
            this.themeService.setTheme(environment.defaultTheme);
            this.router.navigate(["/uiview/dashboard"]);
          });
      })
      .catch((error) => {
        this.errorHandling(error);
      });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        this.themeService
          .getUserThemeColor(result.user.uid)
          .subscribe((item: any) => {
            this.userDetails = result.user;
            if (item) {
              var userColor: string;
              for (const key in item) {
                userColor = item[key];
              }
              this.themeService.setTheme(userColor);
              this.userDetails.themeColor = userColor;
            } else {
              this.themeService.setThemeColorService(
                environment.defaultTheme,
                result.user.uid
              );
              this.userDetails.themeColor = environment.defaultTheme;
            }
            this.router.navigate(["/uiview/dashboard"]);
          });
      })
      .catch((error) => {
        this.errorHandling(error);
      });
  }

  private errorHandling(errorRes: any) {
    return this._snackBar.open(errorRes, "", {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  LogOut() {
    const head = this.document.getElementsByTagName("head")[0];
    const style = this.document.getElementById("client-theme");
    style.setAttribute("href", `${environment.defaultTheme}.css`);
    head.appendChild(style);
    localStorage.clear();
    this.router.navigate(["./"]);
    this.afAuth.signOut();
    this.userDetails = "";
  }
}
