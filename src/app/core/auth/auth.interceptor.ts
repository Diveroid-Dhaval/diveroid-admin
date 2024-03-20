import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    /**
     * Constructor
     */
    constructor(private _authService: AuthService)
    {
    }

    /**
     * Intercept
     *
     * @param request
     * @param next
     */
    intercept = (
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> => {
        const idToken = this._authService.accessToken;
        const cloned = request.clone({
          setHeaders: {
            "access-token": ` ${idToken}`,
          },
        });
        return next.handle(cloned);
      };
}
