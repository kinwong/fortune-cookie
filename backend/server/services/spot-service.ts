import { Meteor, Subscription } from 'meteor/meteor';
import * as log from 'winston';
import { Random } from 'meteor/random';
import * as api from '../../imports/api';
import { MeteorObservable } from 'meteor-rxjs';
import { } from '../core/meteor';
import * as loash from 'lodash';


const spotChangeInterval = 250;
/**
 * 
 * @export
 * @class SpotService
 * http://meteorcapture.com/publishing-anything/
 */
export class SpotService {
  private readonly _lastSpots: Map<string, api.ISpot> = 
  new Map<string, api.ISpot>();
  private _timerId: number;

  private readonly _subscriptions: Map<string, Subscription[]> = 
    new Map<string, Subscription[]>();

  public start(): void {
    log.info('Spot-Service starting...');
    this._timerId = Meteor.setInterval(
      () => SpotService.generateSpots(this._subscriptions), 
      spotChangeInterval);
    const service = this;

    // tslint:disable-next-line:only-arrow-functions
    Meteor.publish(api.dataMarketSpot, function(rics: string[]) {
      const self: Subscription = this;
      log.info('Spot-ric[%s] subscribed.', rics.join(','));
      for (const ric of rics) {
        let subscriptions = service._subscriptions.get(ric);
        if (subscriptions === undefined) {
          subscriptions = [self];
          service._subscriptions.set(ric, subscriptions);
        } else {
          subscriptions.push(self);
        }
      }
      self.onStop(() => {
        log.info('Spot-ric[%s] unsubscribed.', rics.join(','));
        for (const ric of rics) {
          const subscriptions = service._subscriptions.get(ric);
          if (subscriptions !== undefined) {
            const index = subscriptions.indexOf(self);
            if (index > -1) {
              subscriptions.splice(index);
            }
            if (subscriptions.length === 0) {
              service._subscriptions.delete(ric);
            }
          }
        }
      });
      // self.ready();
    });
    log.info('Spot-Service started.');
  }

  public stop(): void {
    if (this._timerId !== undefined) {
      Meteor.clearInterval(this._timerId);
      this._timerId = undefined;
    }
  }

  // tslint:disable-next-line:member-ordering
  private static generateSpots(subscriptions: Map<string, Subscription[]>): void {
    const rics = Array.from<string>(subscriptions.keys());
    for (const ric of rics) {
      if (Random.fraction() > 0.75) {
        const spot: api.ISpot = {
          ric,
          timestamp: new Date(),
          value: Random.fraction() * 1000.0
        };
        log.info('ric:%s - %d', ric, spot.value);
        for (const subscription of subscriptions.get(ric)) {
          subscription.added(api.dataMarketSpot, Random.id(), spot);
          subscription.ready();
        }
      }
    }
  }
}
