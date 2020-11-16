import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-family-card-view",
  templateUrl: "./family-card-view.component.html",
  styleUrls: ["./family-card-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FamilyCardViewComponent implements OnInit {
  @Input() familyData: any;
  childrenData: any;
  isOptional = true;
  constructor() {}

  ngOnInit() {}

  viewChildren(item: any) {
    this.childrenData = item;
  }
}
