import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { MeteorObservable, MongoObservable } from 'meteor-rxjs';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from './log-service';
import * as _ from 'lodash';

@Injectable()
export class AuthenticationService {
    constructor(private _logger: LogService, private _router: Router, private _zone: NgZone) {
    }
    public get isLoggingIn(): boolean {
        return Meteor.loggingIn();
    }
    public get isLoggedIn(): boolean {
        return Meteor.userId == null;
    }
    public get user(): Meteor.User {
        return Meteor.user();
    }
    public get userId(): string {
        return Meteor.userId();
    }
    public login(username: string, password: string): Observable<boolean> {
        return Observable.create(observer => {
            Meteor.loginWithPassword(username, password,
            error => this._zone.run(() => {
                if (error) {
                    this._logger.error(error);
                    observer.error(error);
                } else {
                    observer.onNext(true);
                    observer.onCompleted();
                    this._router.navigate(['Home']);
                }
            }));
            return _.noop;
        });
    }
    public logout() {
        Meteor.logout();
    }
    
    public register(
        username: string, password: string, email: string, profile?: any): Observable<boolean> {
        return Observable.create(observer => {
            Accounts.createUser({
            username, email, password, profile},
            error => this._zone.run(() => {
                if (error) {
                    this._logger.error(error);
                    observer.error(error);
                } else {
                    observer.onNext(true);
                    observer.onCompleted();
                    this._router.navigate(['Home']);
                }
            }));
            return _.noop;
        });
    }
}
