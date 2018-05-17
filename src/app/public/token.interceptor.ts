// import { tap } from 'rxjs/operators';
import { Inject, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk/global";
import { CognitoUtil, Callback } from "./services/cognito.service";
import { tap, mergeMap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    public cognitoUtil: CognitoUtil
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.cognitoUtil.getIdTokenObservable().pipe(
      mergeMap(token => {
        request = request.clone({
          setHeaders: {
            'Authorization': token
          }
        });

        // Intercept 401 errors and redirect to login page
        return next.handle(request).pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              // Lambda is returning 200 with some python errors that need to be intercepted
              if (event.body && event.body.errorType) {
                console.error("Http Interceptor caught an error for request: " + event.url);
                console.error(event.body);
                throw new Error(JSON.stringify(event.body));
              }
              return event;
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                console.log('interceptor caught a 401 error');
              }
            }

            return err;
          })
        );
      })
    );
  }
}
