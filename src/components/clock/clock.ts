import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    moduleId: module.id,
    selector: 'fc-clock',
    template: `
    <div>{{dateTime}}</div>
    `
})
export class ClockComponent implements OnInit, OnDestroy {
    public dateTime: Date;

    private _subscription: Subscription;
    constructor() {
        //
    }
    public ngOnInit(): void {
        const timer = Observable.timer(0, 1000).onErrorResumeNext();
        this._subscription = timer.subscribe(
            (x) => {
                this.dateTime = new Date();
        });
    }
    public ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
