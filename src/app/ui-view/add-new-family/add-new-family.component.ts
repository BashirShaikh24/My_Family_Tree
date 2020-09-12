import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { AuhtService } from "src/app/services/auth-service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-add-new-family",
  templateUrl: "./add-new-family.component.html",
  styleUrls: [
    "./add-new-family.component.css",
    "../view-all-family/family-card-tree-view/family-card-view/family-card-view.component.css",
  ],
})
export class AddNewFamilyComponent implements OnInit {
  familyDetail: FormGroup;
  fatherDetail: FormGroup;
  motherDetail: FormGroup;
  childrenDetail: FormGroup;
  childrenArrayDetail: FormGroup;
  hobbiesDetail: FormGroup;
  hobbiesArray: FormArray;
  childrenArray: FormArray;
  userDetails: any;
  childrenId: string;
  childrenName: string;
  isOptional = true;
  maxDate = new Date();
  private onDestroySubscription: Subject<void> = new Subject<void>();

  constructor(
    private commonservice: CommonService,
    private http: Router,
    private formBuilder: FormBuilder,
    private authService: AuhtService
  ) {
    this.deleteChildren();
  }

  ngOnInit() {
    this.userDetails = this.authService.userDetails;

    this.familyDetail = this.formBuilder.group({
      familyName: ["", Validators.required],
      familyNickName: [""],
      familyOwnerName: ["", Validators.required],
      familyOwnerMobileNo: ["", Validators.required],
      familyOwnerGender: ["Male"],
      familyOwnerDateOfBirth: ["", Validators.required],
      familyDescription: [""],
      familyLogo: [""],
    });

    this.fatherDetail = this.formBuilder.group({
      fatherName: ["", Validators.required],
      fatherMobileNo: ["", Validators.required],
      fatherGender: ["Male"],
      fatherDateOfBirth: ["", Validators.required],
      fatherHobbiesArray: this.formBuilder.array([]),
      fatherOccupation: ["", Validators.required],
      fatherLogo: [""],
    });

    this.motherDetail = this.formBuilder.group({
      motherName: ["", Validators.required],
      motherMobileNo: ["", Validators.required],
      motherGender: [{ value: "Female", disabled: true }],
      motherDateOfBirth: ["", Validators.required],
      motherHobbiesArray: this.formBuilder.array([]),
      motherOccupation: ["", Validators.required],
      motherLogo: [""],
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

    this.childrenArrayDetail = this.formBuilder.group({
      childrenArray: this.formBuilder.array([]),
    });

    this.hobbiesDetail = this.formBuilder.group({
      hobbies: ["", Validators.required],
    });
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

  addChildren() {
    this.childrenArray = this.childrenArrayDetail.get(
      "childrenArray"
    ) as FormArray;
    this.childrenArray.push(this.createChildren());
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
          var hobbiesArray = this.childrenArrayDetail.get(
            "childrenArray"
          ) as FormArray;
          hobbiesArray.removeAt(item.recordId);
        }
      });
  }

  editChildren(index: string, item: any) {
    console.log(item);
    this.childrenArray = this.childrenArrayDetail.get(
      "childrenArray"
    ) as FormArray;
    this.childrenDetail.setValue({
      childrenName: item.childrenName,
      childrenMobileNo: item.childrenMobileNo,
      childrenGender: item.childrenGender,
      childrenDateOfBirth: item.childrenDateOfBirth,
      childrenHobbiesArray: item.childrenHobbiesArray as FormArray,
      childrenOccupation: item.childrenOccupation,
      childrenLogo: item.childrenLogo,
    });
    this.childrenDetail.setControl('childrenHobbiesArray', this.childrenArray.(item.childrenHobbiesArray || []));

    console.log(this.childrenDetail, "this.childrenDetail");
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

  resetChildren() {
    this.childrenDetail.reset();
    this.childrenDetail.patchValue({
      childrenGender: "Male",
      childrenHobbiesArray: [],
    });
    this.hobbiesDetail.reset();
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
    ].fatherDetail.motherDetail.childrenDetail = this.childrenArrayDetail.value;
    this.commonservice.addFamilyMemberService(
      allFamilyDetail,
      this.userDetails.uid
    );
    this.http.navigate(["../uiview/viewAllFamily"]);
  }

  ngOnDestroy() {
    this.onDestroySubscription.next();
  }
}
