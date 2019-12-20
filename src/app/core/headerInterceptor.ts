import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';


@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.error(err);
      }
      return throwError(err);
    })
    );
  }

}
