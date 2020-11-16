import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { CommonService } from "src/app/services/common.service";
import { AuhtService } from "src/app/services/auth-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-all-family",
  templateUrl: "./view-all-family.component.html",
  styleUrls: ["./view-all-family.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewAllFamilyComponent implements OnInit, OnDestroy {
  familyMemberList = [];
  familyId: string;
  familyName: string;
  subscription: Subscription;
  userDetails: any;
  loader: boolean = true;
  private onDestroySubscription: Subject<void> = new Subject<void>();

  constructor(
    private commonservice: CommonService,
    private authService: AuhtService,
    private router: Router
  ) {
    this.commonservice.selectedUserDetails = "";
    this.deleteFamily();
  }

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
    this.getAllFamilyList(this.userDetails.uid);
  }

  setDeleteFamilyId(recordDetails: any) {
    this.familyId = recordDetails.key;
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

  viewEditFamily(item: any, path: string) {
    this.commonservice.selectedUserDetails = item;
    this.router.navigateByUrl(this.router.url + "/" + path, {
      replaceUrl: true,
    });
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
        this.loader = false;
      });
  }

  ngOnDestroy() {
    this.onDestroySubscription.next();
  }
}
