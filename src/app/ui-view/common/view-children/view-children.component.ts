import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-view-children",
  templateUrl: "./view-children.component.html",
  styleUrls: [
    "./view-children.component.css",
    "../../view-all-family/family-card-tree-view/family-card-view/family-card-view.component.css",
  ],
})
export class ViewChildrenComponent implements OnInit {
  @Input() childrenData: any;
  constructor() {}

  ngOnInit(): void {}
}
