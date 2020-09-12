import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { CommonService } from "src/app/services/common.service";
import { AuhtService } from "src/app/services/auth-service";

@Component({
  selector: "app-view-all-family",
  templateUrl: "./view-all-family.component.html",
  styleUrls: ["./view-all-family.component.css"],
})
export class ViewAllFamilyComponent implements OnInit, OnDestroy {
  familyMemberList = [];
  familyId: string;
  familyName: string;
  subscription: Subscription;
  userDetails: any;
  private onDestroySubscription: Subject<void> = new Subject<void>();

  constructor(
    private commonservice: CommonService,
    private authService: AuhtService
  ) {
    this.deleteFamily();
  }

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
    this.getAllFamilyList(this.userDetails.uid);
  }

  setDeleteFamilyId(recordDetails: any) {
    this.familyId = recordDetails.id;
    this.familyName = recordDetails.familyDetail.familyName;
  }

  deleteFamily() {
    this.commonservice.deleteConFlag
      .pipe(takeUntil(this.onDestroySubscription))
      .subscribe((item) => {
        if (item.flag) {
          this.commonservice.deleteFamilyMemberService(
            item.recordId,
            this.userDetails.uid
          );
        }
      });
  }

  viewfamily(item: any) {
    this.commonservice.selectedUserDetails = item.familyDetail;
  }

  getAllFamilyList(userId: string) {
    this.subscription = this.commonservice
      .getAllFamilysListService(userId)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        takeUntil(this.onDestroySubscription)
      )
      .subscribe((customers) => {
        this.familyMemberList = customers;
      });
  }

  ngOnDestroy() {
    this.onDestroySubscription.next();
  }
}
