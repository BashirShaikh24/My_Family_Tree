import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ViewAllFamilyComponent } from "./view-all-family.component";

const routes: Routes = [
  {
    path: "",
    component: ViewAllFamilyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAllFamilyRoutingModule {}
