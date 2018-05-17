import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";
import { Callback, CognitoUtil } from "./cognito.service";

@Injectable()
export class UserParametersService {

    constructor(public cognitoUtil: CognitoUtil) {
    }

    getParameters(callback?: Callback): Observable<any> {
        return Observable.create((observer) => {
            let cognitoUser = this.cognitoUtil.getCurrentUser();

            if (cognitoUser != null) {
                cognitoUser.getSession(function (err, session) {
                    if (err) {
                        console.log("UserParametersService: Couldn't retrieve the user");
                    } else {
                        cognitoUser.getUserAttributes(function (errInner, result) {
                            if (errInner) {
                                console.log("UserParametersService: in getParameters: " + err);
                            } else {
                                if (callback) {
                                    callback.callbackWithParam(result);
                                }
                                observer.next(result);
                            }
                        });
                    }

                });
            } else {
                if (callback) {
                    callback.callbackWithParam(null);
                }
                observer.next(null);
            }
        });
    }
}
