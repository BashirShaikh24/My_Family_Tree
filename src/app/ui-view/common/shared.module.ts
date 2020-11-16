import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteComponent } from "./delete/delete.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { ViewChildrenComponent } from "./view-children/view-children.component";
import { ShortenPipe } from "src/app/services/shorten.pipe";
import { NumberDirective } from "src/app/directives/numeric";
import { AppRoutingModule } from "src/app/app.routing-module";
import { AngularMaterialSharedModule } from "src/app/angular-material-shared.module";
import { AddNewFamilyComponent } from "../add-new-family/add-new-family.component";
import { ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from './loader/loader.component';

const commonModules = [
  DeleteComponent,
  FooterComponent,
  HeaderComponent,
  SidenavComponent,
  ViewChildrenComponent,
  AddNewFamilyComponent,
  LoaderComponent,
  ShortenPipe,
  NumberDirective,
];

@NgModule({
  declarations: [...commonModules],
  imports: [
    CommonModule,
    AngularMaterialSharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [...commonModules, AngularMaterialSharedModule],
})
export class SharedModule {}
