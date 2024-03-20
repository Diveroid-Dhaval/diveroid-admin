import { Component, OnInit, Output, EventEmitter, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../core/services/auth.service";
import { CookieService } from "ngx-cookie-service";
// import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private authService: AuthService,
    public _cookiesService: CookieService
  ) {}

  // listLang = [
  //   { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
  //   { text: "Spanish", flag: "assets/images/flags/spain.jpg", lang: "es" },
  //   { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
  //   { text: "Italian", flag: "assets/images/flags/italy.jpg", lang: "it" },
  //   { text: "Russian", flag: "assets/images/flags/russia.jpg", lang: "ru" },
  // ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

  }

  

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    Swal.fire({
      title: "Are you sure",
      text: "You want to log out ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes !",
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "Log out!",
          "You have been successfully logged out.",
          "success"
        );
        this.authService.logout();
        localStorage.clear();
        this.router.navigate(["/account/login"]);
      }
    });
  }
 
}
