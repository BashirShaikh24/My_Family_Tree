import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-family-card-tree-view",
  templateUrl: "./family-card-tree-view.component.html",
  styleUrls: ["./family-card-tree-view.component.css"],
})
export class FamilyCardTreeViewComponent implements OnInit {
  setFamilyData: any;
  constructor(private commonservice: CommonService) {}

  ngOnInit() {
    this.setFamilyData = this.commonservice.selectedUserDetails;
  }

}
