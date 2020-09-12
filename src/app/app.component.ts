import { Component, OnInit, Inject } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { DOCUMENT } from "@angular/common";
import { AuhtService } from "./services/auth-service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "my-dream-app";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService,
    private authService: AuhtService
  ) {}

  ngOnInit() {
    const userStr = this.authService.userDetails;
    if (userStr) {
      var theme = JSON.parse(userStr);
      this.themeService.setTheme(theme);
    } else {
      const head = this.document.getElementsByTagName("head")[0];
      const style = this.document.createElement("link");
      style.id = "client-theme";
      style.rel = "stylesheet";
      style.href = "default.css";
      head.appendChild(style);
      this.authService.LogOut();
    }
  }
}
