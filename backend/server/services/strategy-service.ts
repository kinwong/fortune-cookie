
import * as log from 'winston';
import * as api from '../../imports/api';

/**
 * 
 * @export
 * @class StrategyService
 */
export class StrategyService {

  public start(): void {
    log.info('Strategy-Service starting...');
    this.bootstrap();
    const strategies = api.strategies;
    Meteor.methods({
      insertStrategy(strategy: api.IStrategy): void {
        strategies.insert(strategy);
      },
      deleteStrategy(name: string): void {
        strategies.remove({ name: {$eq: name}});
      }
    });
    // tslint:disable-next-line:only-arrow-functions
    Meteor.publish('strategies', function(): Mongo.Cursor<any> {
      log.info('strategies- subscribed.');
      const self: Subscription = this;
      self.onStop(() => log.info('strategies-unsubscribed.'));
      return strategies.find();
    });
    log.info(`Strategy-Service fully started - ${strategies.find().count()} strategies loaded.`);
  }

  private bootstrap(): void {
    const strategies = api.strategies;
    if (strategies.find().count() === 0) {
      const records = JSON.parse(Assets.getText('strategies.json'));
      for (const record of records) {
        const strategy = record as api.IStrategy;
        strategies.upsert(
          { name: { $eq: strategy.name } }, 
          {
            name: strategy.name,
            description: strategy.description
          });
      }
    }
  }
}
