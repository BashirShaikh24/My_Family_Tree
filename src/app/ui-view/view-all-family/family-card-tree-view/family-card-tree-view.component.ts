import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-family-card-tree-view",
  templateUrl: "./family-card-tree-view.component.html",
  styleUrls: ["./family-card-tree-view.component.css"],
})
export class FamilyCardTreeViewComponent implements OnInit {
  setFamilyData: any;
  listView: boolean = true;
  data: any;
  constructor(
    private commonservice: CommonService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.setFamilyData = this.commonservice.selectedUserDetails.familyDetail;
  }

  onbackToAllFamily() {
    this.router.navigate(["/uiview/viewAllFamily"]);
  }
}
