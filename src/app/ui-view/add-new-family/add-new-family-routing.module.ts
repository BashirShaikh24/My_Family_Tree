import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewFamilyComponent } from "./add-new-family.component";

const routes: Routes = [
  {
    path: "",
    component: AddNewFamilyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewFamilyRoutingModule {}
