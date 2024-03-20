import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
  
@Injectable()

export class ApiInterceptor implements HttpInterceptor {
  
  private HOSTS: { [key: string]: string } = {};

  constructor() {
    environment.hosts.forEach((host) => {
      this.HOSTS[host.prefix] = host.target;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.urlWithParams && req.urlWithParams.includes('X-Amz-Algorithm')) {
      return next.handle(req);
    }

    const externalParam = req.params.get('external');
    if (externalParam) {
      return next.handle(req);
    }

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