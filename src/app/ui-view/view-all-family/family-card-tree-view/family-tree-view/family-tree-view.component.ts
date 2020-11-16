import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-family-tree-view",
  templateUrl: "./family-tree-view.component.html",
  styleUrls: ["./family-tree-view.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class FamilyTreeViewComponent implements OnInit {
  @Input() familyData: any;

  ngOnInit(): void {}
}
