import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { ThemeService } from "src/app/services/theme.service";
import { AuhtService } from "src/app/services/auth-service";

@Component({
  selector: "app-themes",
  templateUrl: "./themes.component.html",
  styleUrls: ["./themes.component.css"],
})
export class ThemesComponent implements OnInit, OnDestroy {
  colorList = [];
  selectedColor: string;
  selectedColorId: string;
  userDetails: any;
  private onDestroySubscription: Subject<void> = new Subject<void>();
  constructor(
    private themeService: ThemeService,
    private authService: AuhtService
  ) {}
  @ViewChild("themeColor") theme: NgForm;

  ngOnInit() {
    this.userDetails = this.authService.userDetails;
    this.getAllThemeList(this.userDetails.uid);
  }

  addColor() {
    this.themeService.addTheme(this.theme.value);
  }

  getAllThemeList(userId: string) {
    this.themeService
      .getAllThemeColor()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        ),
        takeUntil(this.onDestroySubscription)
      )
      .subscribe((customers) => {
        this.colorList = customers;
        this.themeService.getUserThemeColor(userId).subscribe((item: any) => {
          for (const key in item) {
            this.selectedColorId = key;
            this.selectedColor = item[key];
          }
        });
      });
  }

  selectThemeColor(item: any) {
    this.selectedColor = item.color;
    item.key = this.selectedColorId;
    this.themeService.updateUserTheme(item, this.userDetails.uid);
    this.themeService.setTheme(this.selectedColor);
    this.userDetails.themeColor = this.selectedColor;
  }

  ngOnDestroy() {
    this.onDestroySubscription.next();
  }
}
