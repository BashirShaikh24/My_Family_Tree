import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemesComponent } from "./themes.component";
import { ThemesRoutingModule } from "./themes-routing.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThemesComponent],
  imports: [CommonModule, ThemesRoutingModule, FormsModule],
  exports: [],
})
export class ThemesModule {}
