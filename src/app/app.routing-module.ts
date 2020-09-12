import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { UiViewComponent } from "./ui-view/ui-view.component";
import { DashboardComponent } from "./ui-view/dashboard/dashboard.component";
import { AddNewFamilyComponent } from "./ui-view/add-new-family/add-new-family.component";
import { ViewAllFamilyComponent } from "./ui-view/view-all-family/view-all-family.component";
import { EditFamilyComponent } from "./ui-view/view-all-family/edit-family/edit-family.component";
import { FamilyCardTreeViewComponent } from "./ui-view/view-all-family/family-card-tree-view/family-card-tree-view.component";
import { ThemesComponent } from "./ui-view/themes/themes.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "uiview",
    component: UiViewComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "addNewFamily",
        component: AddNewFamilyComponent,
      },
      {
        path: "viewAllFamily",
        component: ViewAllFamilyComponent,
      },
      {
        path: "viewAllFamily/familyCardTreeView",
        component: FamilyCardTreeViewComponent,
      },
      {
        path: "viewAllFamily/editFamily",
        component: EditFamilyComponent,
      },
      {
        path: "themes",
        component: ThemesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
