import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BackButtonDisableModule } from "angular-disable-browser-back-button";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { UiViewComponent } from "./ui-view/ui-view.component";
import { AppRoutingModule } from "./app.routing-module";
import { AuhtService } from "./services/auth-service";
import { CommonService } from "./services/common.service";
import { ThemeService } from "./services/theme.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { DashboardModule } from "./ui-view/dashboard/dashboard.module";
import { ViewAllFamilyModule } from "./ui-view/view-all-family/view-all-family.module";
import { ThemesModule } from "./ui-view/themes/themes.module";
import { UserAccountModule } from "./ui-view/user-account/user-account.module";
import { SharedModule } from "./ui-view/common/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UiViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    DashboardModule,
    ViewAllFamilyModule,
    ThemesModule,
    UserAccountModule,
    SharedModule,
    BackButtonDisableModule.forRoot(),
  ],
  providers: [AuhtService, CommonService, ThemeService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
