import { Component, Input } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { AuhtService } from "src/app/services/auth-service";

@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.css"],
})
export class DeleteComponent {
  @Input() getRecordId: string;
  @Input() modelHeader: string;
  @Input() recordName: string;
  userDetails: any;

  constructor(
    private commonservice: CommonService,
    private authService: AuhtService
  ) {
    this.userDetails = this.authService.userDetails;
  }

  confDeleteFamily() {
    this.commonservice.deleteConFlag.next({
      recordId: this.getRecordId,
      flag: true,
    });
  }
}
