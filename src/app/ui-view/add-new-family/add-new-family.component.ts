import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { AuhtService } from "src/app/services/auth-service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import * as moment from "moment";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-add-new-family",
  templateUrl: "./add-new-family.component.html",
  styleUrls: ["./add-new-family.component.css"],
})
export class AddNewFamilyComponent implements OnInit {
  @Input() familyData: any;
  @Input() familyId: any;
  familyDetail: FormGroup;
  fatherDetail: FormGroup;
  motherDetail: FormGroup;
  childrenDetail: FormGroup;
  childrenArrayDetail = [];
  hobbiesDetail: FormGroup;
  hobbiesArray: FormArray;
  userDetails: any;
  childrenId: string;
  childrenName: string;
  childrenData: any;
  editMode: boolean = false;
  childrenIndex: string;
  isOptional = true;
  maxDate = moment().format("YYYY-MM-DD");
  snackBarRef: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  private onDestroySubscription: Subject<void> = new Subject<void>();

  constructor(
    private commonservice: CommonService,
    private http: Router,
    private formBuilder: FormBuilder,
    private authService: AuhtService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.deleteChildren();
  }

  ngOnInit() {
    var checkMode = this.router.url.includes("editFamily", 0);
    if (!checkMode) {
      this.familyData = "";
    }
    this.userDetails = this.authService.userDetails;
    this.familyDetail = this.formBuilder.group({
      familyName: [
        this.familyData ? this.familyData.familyName : "",
        Validators.required,
      ],
      familyNickName: [this.familyData ? this.familyData.familyNickName : ""],
      familyOwnerName: [
        this.familyData ? this.familyData.familyOwnerName : "",
        Validators.required,
      ],
      familyOwnerMobileNo: [
        this.familyData ? this.familyData.familyOwnerMobileNo : "",
        Validators.required,
      ],
      familyOwnerGender: [
        this.familyData ? this.familyData.familyOwnerGender : "Male",
      ],
      familyOwnerDateOfBirth: [
        this.familyData ? this.familyData.familyOwnerDateOfBirth : "",
        Validators.required,
      ],
      familyDescription: [
        this.familyData ? this.familyData.familyDescription : "",
      ],
      familyLogo: [this.familyData ? this.familyData.familyLogo : ""],
    });

    this.fatherDetail = this.formBuilder.group({
      fatherName: [
        this.familyData ? this.familyData.fatherDetail.fatherName : "",
        Validators.required,
      ],
      fatherMobileNo: [
        this.familyData ? this.familyData.fatherDetail.fatherMobileNo : "",
        Validators.required,
      ],
      fatherGender: [
        this.familyData ? this.familyData.fatherDetail.fatherGender : "Male",
      ],
      fatherDateOfBirth: [
        this.familyData ? this.familyData.fatherDetail.fatherDateOfBirth : "",
        Validators.required,
      ],
      fatherHobbiesArray: this.familyData.fatherDetail?.fatherHobbiesArray
        ? this.setExistingHobbies(
            this.familyData.fatherDetail.fatherHobbiesArray
          )
        : this.formBuilder.array([]),
      fatherOccupation: [
        this.familyData ? this.familyData.fatherDetail.fatherOccupation : "",
        Validators.required,
      ],
      fatherLogo: [
        this.familyData ? this.familyData.fatherDetail.fatherLogo : "",
      ],
    });

    this.motherDetail = this.formBuilder.group({
      motherName: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherName
          : "",
        Validators.required,
      ],
      motherMobileNo: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherMobileNo
          : "",
        Validators.required,
      ],
      motherGender: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherGender
          : "Female",
      ],
      motherDateOfBirth: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherDateOfBirth
          : "",
        Validators.required,
      ],
      motherHobbiesArray: this.familyData.fatherDetail?.motherDetail
        .motherHobbiesArray
        ? this.setExistingHobbies(
            this.familyData.fatherDetail.motherDetail.motherHobbiesArray
          )
        : this.formBuilder.array([]),
      motherOccupation: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherOccupation
          : "",
        Validators.required,
      ],
      motherLogo: [
        this.familyData
          ? this.familyData.fatherDetail.motherDetail.motherLogo
          : "",
      ],
    });

    this.childrenDetail = this.formBuilder.group({
      childrenName: ["", Validators.required],
      childrenMobileNo: ["", Validators.required],
      childrenGender: ["Male"],
      childrenDateOfBirth: ["", Validators.required],
      childrenHobbiesArray: this.formBuilder.array([]),
      childrenOccupation: ["", Validators.required],
      childrenLogo: [""],
    });

    this.hobbiesDetail = this.formBuilder.group({
      hobbies: ["", Validators.required],
    });

    if (this.familyData.fatherDetail?.motherDetail.childrenDetail) {
      this.childrenArrayDetail = this.familyData.fatherDetail.motherDetail.childrenDetail;
    }
  }

  createHobbieItem(): FormGroup {
    return this.formBuilder.group({
      hobbie: this.hobbiesDetail.get("hobbies").value,
    });
  }

  addHobbies(scope: any, formName: string, hobbiesArrayValue: string): void {
    this.hobbiesArray = scope[formName].get(hobbiesArrayValue) as FormArray;
    this.hobbiesArray.push(this.createHobbieItem());
    this.hobbiesDetail.reset();
  }

  removeHobbie(
    scope: any,
    formName: string,
    hobbiesArrayValue: string,
    index: any
  ): void {
    var hobbiesArray = scope[formName].get(hobbiesArrayValue) as FormArray;
    hobbiesArray.removeAt(index);
  }

  createChildren(): FormGroup {
    return this.formBuilder.group({
      childrenName: this.childrenDetail.get("childrenName").value,
      childrenMobileNo: this.childrenDetail.get("childrenMobileNo").value,
      childrenGender: this.childrenDetail.get("childrenGender").value,
      childrenDateOfBirth: this.childrenDetail.get("childrenDateOfBirth").value,
      childrenOccupation: this.childrenDetail.get("childrenOccupation").value,
      childrenHobbiesArray: this.childrenDetail.get(
        "childrenHobbiesArray"
      ) as FormArray,
      childrenLogo: this.childrenDetail.get("childrenLogo").value,
    });
  }

  addEditChildren() {
    if (this.editMode) {
      this.childrenArrayDetail[
        this.childrenIndex
      ] = this.createChildren().value;
      this.editMode = false;
    } else {
      this.childrenArrayDetail.push(this.createChildren().value);
    }
    this.resetChildren();
  }

  editChildren(index: string, item: any) {
    this.childrenIndex = index;
    this.childrenDetail.patchValue({
      childrenName: item.childrenName,
      childrenMobileNo: item.childrenMobileNo,
      childrenGender: item.childrenGender,
      childrenDateOfBirth: item.childrenDateOfBirth,
      childrenOccupation: item.childrenOccupation,
      childrenLogo: item.childrenLogo,
    });
    this.childrenDetail.setControl(
      "childrenHobbiesArray",
      this.setExistingHobbies(item.childrenHobbiesArray)
    );
    this.editMode = true;
  }

  setExistingChildrens(childrens: any) {
    const formArray = new FormArray([]);
    childrens.forEach((children: any) => {
      formArray.push(
        this.formBuilder.group({
          childrenName: children.childrenName,
          childrenMobileNo: children.childrenMobileNo,
          childrenGender: children.childrenGender,
          childrenDateOfBirth: children.childrenDateOfBirth,
          childrenHobbiesArray: this.setExistingHobbies(
            children.childrenHobbiesArray
          ),
          childrenOccupation: children.childrenOccupation,
          childrenLogo: children.childrenLogo,
        })
      );
    });
    return formArray;
  }

  setExistingHobbies(hobbies: any) {
    const formArray = new FormArray([]);
    if (hobbies) {
      hobbies.forEach((element: any) => {
        formArray.push(
          this.formBuilder.group({
            hobbie: element.hobbie,
          })
        );
      });
    }
    return formArray;
  }

  resetChildren() {
    this.childrenDetail = this.formBuilder.group({
      childrenName: ["", Validators.required],
      childrenMobileNo: ["", Validators.required],
      childrenGender: ["Male"],
      childrenDateOfBirth: ["", Validators.required],
      childrenHobbiesArray: this.formBuilder.array([]),
      childrenOccupation: ["", Validators.required],
      childrenLogo: [""],
    });
    this.hobbiesDetail.reset();
  }

  setDeleteChildrenId(id: any, recordDetails: any) {
    this.childrenId = id;
    this.childrenName = recordDetails.childrenName;
  }

  deleteChildren() {
    this.commonservice.deleteConFlag
      .pipe(takeUntil(this.onDestroySubscription))
      .subscribe((item) => {
        if (item.flag) {
          if (this.childrenArrayDetail) {
            this.childrenArrayDetail.splice(item.recordId);
          }
        }
      });
  }

  viewChildren(item: any) {
    this.childrenData = item;
    console.log(item,'item')
  }

  onFileChange(event: any, scope: any, formName: string, logoName: string) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        scope[formName].get(logoName).setValue(reader.result as string);
      };
    }
  }

  clearImg(scope: any, formName: string, logoName: string) {
    scope[formName].get(logoName).setValue("");
  }

  getFamilyDetails() {
    var allFamilyDetail = {};
    allFamilyDetail["familyDetail"] = this.familyDetail.value;
    allFamilyDetail["familyDetail"].fatherDetail = this.fatherDetail.value;
    allFamilyDetail[
      "familyDetail"
    ].fatherDetail.motherDetail = this.motherDetail.value;
    allFamilyDetail[
      "familyDetail"
    ].fatherDetail.motherDetail.childrenDetail = this.childrenArrayDetail;
    let successMsg: string;
    if (this.familyData) {
      this.commonservice.updateFamilyMemberService(
        allFamilyDetail,
        this.userDetails.uid,
        this.familyId
      );
      successMsg = `${this.familyDetail.value.familyName} Family is Successfully Updated`;
    } else {
      this.commonservice.addFamilyMemberService(
        allFamilyDetail,
        this.userDetails.uid
      );
      successMsg = `${this.familyDetail.value.familyName} Family is Successfully Created`;
    }

    this.snackBarRef = this._snackBar.open(successMsg, "", {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.snackBarRef.afterDismissed().subscribe(() => {
      this.http.navigate(["../uiview/viewAllFamily"]);
    });
  }

  ngOnDestroy() {
    this.onDestroySubscription.next();
  }
}
