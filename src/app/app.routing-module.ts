import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AddNewFamilyComponent } from "./ui-view/add-new-family/add-new-family.component";
import { UiViewComponent } from "./ui-view/ui-view.component";
import { EditFamilyComponent } from "./ui-view/view-all-family/edit-family/edit-family.component";
import { FamilyCardTreeViewComponent } from "./ui-view/view-all-family/family-card-tree-view/family-card-tree-view.component";
import { ViewAllFamilyComponent } from "./ui-view/view-all-family/view-all-family.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "uiview",
    component: UiViewComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./ui-view/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
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
        loadChildren: () =>
          import("./ui-view/themes/themes.module").then((m) => m.ThemesModule),
      },
      {
        path: "userAccount",
        loadChildren: () =>
          import("./ui-view/user-account/user-account.module").then((m) => m.UserAccountModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
