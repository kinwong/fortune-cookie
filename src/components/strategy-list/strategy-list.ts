import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
  moduleId: module.id,
  selector: 'strategy-list',
  templateUrl: './strategy-list.html'
})
export class StrategyListComponent implements OnInit, OnDestroy {
  public strategies: Observable<any> = null;
  private handle: Meteor.SubscriptionHandle;
  constructor() {
  }
  public ngOnInit(): void {
  //   Tracker.autorun(() => {
  // Meteor.subscribe('countsByRoom', Session.get('roomId'));
//});
    console.log('ngOnInit');
    // this.handle = Meteor.subscribe('strategies', )
    // this.strategies = MeteorObservable
    //   .subscribe('strategies').do(x => {
    //     console.log(x);
    //   }).zone();
  }
  public ngOnDestroy(): void {
    // console.log('ngOnDestroy');
    // handle.
  }
}
