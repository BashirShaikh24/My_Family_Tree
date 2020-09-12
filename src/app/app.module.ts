import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from "@angular/fire";
import { MatStepperModule } from "@angular/material/stepper";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { HeaderComponent } from "./ui-view/common/header/header.component";
import { FooterComponent } from "./ui-view/common/footer/footer.component";
import { SidenavComponent } from "./ui-view/common/sidenav/sidenav.component";
import { DeleteComponent } from "./ui-view/common/delete/delete.component";
import { UiViewComponent } from "./ui-view/ui-view.component";
import { DashboardComponent } from "./ui-view/dashboard/dashboard.component";
import { AddNewFamilyComponent } from "./ui-view/add-new-family/add-new-family.component";
import { ViewAllFamilyComponent } from "./ui-view/view-all-family/view-all-family.component";
import { EditFamilyComponent } from "./ui-view/view-all-family/edit-family/edit-family.component";
import { FamilyTreeViewComponent } from "./ui-view/view-all-family/family-card-tree-view/family-tree-view/family-tree-view.component";
import { FamilyCardViewComponent } from "./ui-view/view-all-family/family-card-tree-view/family-card-view/family-card-view.component";
import { FamilyCardTreeViewComponent } from "./ui-view/view-all-family/family-card-tree-view/family-card-tree-view.component";
import { ThemesComponent } from "./ui-view/themes/themes.component";
import { AppRoutingModule } from "./app.routing-module";
import { AuhtService } from "./services/auth-service";
import { CommonService } from "./services/common.service";
import { ThemeService } from "./services/theme.service";
import { ShortenPipe } from "./services/shorten.pipe";
import { NumberDirective } from "./directives/numeric";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    DeleteComponent,
    UiViewComponent,
    DashboardComponent,
    AddNewFamilyComponent,
    ViewAllFamilyComponent,
    FamilyTreeViewComponent,
    FamilyCardViewComponent,
    FamilyCardTreeViewComponent,
    ThemesComponent,
    ShortenPipe,
    EditFamilyComponent,
    NumberDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatStepperModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [AuhtService, CommonService, ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
