import { Component, OnInit } from "@angular/core";
import { AuhtService } from "src/app/services/auth-service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userName: string;
  subscription: Subscription;
  constructor(private authService: AuhtService) {}

  ngOnInit() {
    const userStr = this.authService.userDetails;
    this.userName = userStr.displayName;
  }

  logOut() {
    this.authService.LogOut();
  }
}
