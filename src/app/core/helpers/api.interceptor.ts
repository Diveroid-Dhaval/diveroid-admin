import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class ApiInterceptor implements HttpInterceptor {
  
  private HOSTS: { [key: string]: string } = {};

  constructor() {
    environment.hosts.forEach((host) => {
      this.HOSTS[host.prefix] = host.target;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const httpOptions = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const base = req.url ? req.url.substr(0, req.url.substr(1, req.url.length).indexOf('/') + 1) : '/api';
    const target: string = this.HOSTS[base];

    if (target) {
      const apiReq = req.clone({ url: this.createUrl(target, req.url, base) });
      return next.handle(apiReq);
    }

    const request = req.clone({ setHeaders: httpOptions });
    return next.handle(request);
  }

  createUrl = (target: string, original: string, base: string) => {
    let updatedTarget = target;
    if (target && target.endsWith('/')) {
      updatedTarget = target.substr(0, target.length - 1);
    }
    let originalWithoutPrefix = original.replace(base, '');
    if (originalWithoutPrefix && originalWithoutPrefix.startsWith('/')) {
      originalWithoutPrefix = originalWithoutPrefix.substr(1, originalWithoutPrefix.length);
    }
    return `${updatedTarget}/${originalWithoutPrefix}`;
  };
}