import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable()
export class CommonService {
  private dbPath = "addEditMember";
  selectFamilyId = new Subject<string>();
  deleteConFlag = new Subject<{
    recordId: any;
    flag: boolean;
  }>();
  selectedUserDetails: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private db: AngularFireDatabase
  ) {}

  getSingleFamilyDetail(userId: any, recordId: string) {
    return this.db
      .object(this.dbPath + userId.uid + "/" + recordId)
      .snapshotChanges()
      .pipe(map((res) => res.payload.val()));
  }

  getAllFamilysListService(userId: string): AngularFireList<any> {
    return this.db.list(this.dbPath + userId);
  }

  addFamilyMemberService(key: any, userId: any): void {
    this.db.list(this.dbPath + userId).push(key);
  }

  updateFamilyMemberService(key: any, userId: any, familyId: any) {
    return this.db.list(this.dbPath + userId).update(familyId, key);
  }

  deleteFamilyMemberService(key: any, userId: string) {
    return this.db.list(this.dbPath + userId).remove(key);
  }
}
