import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FamilyCardTreeViewComponent } from "./family-card-tree-view.component";

const routes: Routes = [
  {
    path: "",
    component: FamilyCardTreeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilyCardTreeRoutingModule {}
