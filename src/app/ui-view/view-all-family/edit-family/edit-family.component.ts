import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-edit-family",
  templateUrl: "./edit-family.component.html",
  styleUrls: ["./edit-family.component.css"],
})
export class EditFamilyComponent implements OnInit {
  setFamilyData: any;
  setFamilyId: any;
  constructor(private commonservice: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.setFamilyData = this.commonservice.selectedUserDetails.familyDetail;
    this.setFamilyId = this.commonservice.selectedUserDetails.key;
  }

  onbackToAllFamily() {
    this.router.navigate(["/uiview/viewAllFamily"]);
  }
}
