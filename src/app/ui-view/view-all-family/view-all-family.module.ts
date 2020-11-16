import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ViewAllFamilyComponent } from "./view-all-family.component";
import { EditFamilyComponent } from "./edit-family/edit-family.component";
import { FamilyCardTreeViewComponent } from "./family-card-tree-view/family-card-tree-view.component";
import { FamilyTreeViewComponent } from "./family-card-tree-view/family-tree-view/family-tree-view.component";
import { FamilyCardViewComponent } from "./family-card-tree-view/family-card-view/family-card-view.component";
import { SharedModule } from "../common/shared.module";

const commomModules = [
  ViewAllFamilyComponent,
  EditFamilyComponent,
  FamilyCardTreeViewComponent,
  FamilyTreeViewComponent,
  FamilyCardViewComponent,
];

@NgModule({
  declarations: [...commomModules],
  imports: [CommonModule, SharedModule],
  exports: [...commomModules],
})
export class ViewAllFamilyModule {}
