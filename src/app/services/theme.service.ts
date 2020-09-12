import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
@Injectable()
export class ThemeService {
  colorsRef: AngularFireList<any> = null;
  private dbColorPath = "themeColor";
  private dbUserColorPath = "userThemeColor";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private db: AngularFireDatabase
  ) {
    this.colorsRef = db.list(this.dbColorPath);
  }

  addTheme(key: any): void {
    this.colorsRef.push(key);
  }

  getAllThemeColor(): AngularFireList<any> {
    return this.colorsRef;
  }

  setThemeColorService(key: any, userId: any): void {
    this.db.list(this.dbUserColorPath + userId).push(key);
  }

  getUserThemeColor(userId: any) {
    return this.db
      .object(this.dbUserColorPath + userId)
      .snapshotChanges()
      .pipe(map((res) => res.payload.val()));
  }

  setTheme(theme: string) {
    const head = this.document.getElementsByTagName("head")[0];
    const style = this.document.getElementById("client-theme");
    if (style) {
      style.setAttribute("href", theme.toLowerCase() + ".css");
      head.appendChild(style);
    } else {
      const style = this.document.createElement("link");
      style.id = "client-theme";
      style.rel = "stylesheet";
      style.href = theme.toLowerCase() + ".css";
      head.appendChild(style);
    }
  }

  updateUserTheme(item: any, userId: any) {
    const itemsRef = this.db.list(this.dbUserColorPath + userId);
    itemsRef.set(item.key, item.color);
  }
}
