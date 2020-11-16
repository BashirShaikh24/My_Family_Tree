import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserAccountComponent } from "./user-account.component";
import { UserAccountRoutingModule } from "./user-account-routing.module";

@NgModule({
  declarations: [UserAccountComponent],
  imports: [CommonModule, UserAccountRoutingModule],
  exports: [],
})
export class UserAccountModule {}
