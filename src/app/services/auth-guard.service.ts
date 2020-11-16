import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuhtService } from "../services/auth-service";
import { CommonService } from "./common.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public authService: AuhtService,
    public commonservice: CommonService
  ) {}
  canActivate(): boolean {
    if (!this.authService.userDetails) {
      this.authService.LogOut();
      return false;
    }
    return true;
  }
}
