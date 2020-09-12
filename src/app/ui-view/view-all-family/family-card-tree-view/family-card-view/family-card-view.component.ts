import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-family-card-view",
  templateUrl: "./family-card-view.component.html",
  styleUrls: ["./family-card-view.component.css"],
})
export class FamilyCardViewComponent {
  @Input() familyData: any;
  isOptional = true;
  constructor() {}
}
