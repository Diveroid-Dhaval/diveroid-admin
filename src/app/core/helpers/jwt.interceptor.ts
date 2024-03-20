import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

import { environment } from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  // new code
  intercept = (
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> => {
    const idToken = JSON.parse(localStorage.getItem("currentUser"))?.data?.token;
    const cloned = request.clone({
      setHeaders: {
        "access-token": ` ${idToken}`,
      },
    });
    return next.handle(cloned);
  };
}
