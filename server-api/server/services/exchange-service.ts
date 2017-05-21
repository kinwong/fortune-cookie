
import * as log from 'winston';
import parse = require('csv-parse');
import { IExchange } from '../../imports/api';

/**
 * 
 * @export
 * @class ExchangeStore
 * 
 */
export class ExchangeService {
  private readonly _exchanges: Map<string, IExchange> =
  new Map<string, IExchange>();
  public async start(): Promise<void> {
    log.info('Exchange-Store starting...');
    return new Promise<void>((resolver, reject) => {
      try {
        // Exposes methods.
        Meteor.methods({
          dataExchangesRetrieveAll: (): IExchange[] => {
            return Array.from<IExchange>(this._exchanges.values());
          },
          dataExchangeRetrieve: (mic: string): IExchange => {
            return this._exchanges.get(mic);
          }
        });
        const csv = Assets.getText('exchanges.csv');
        parse(csv, { columns: true, comment: '#' }, (error, exchanges: IExchange[]) => {
          try {
            for (const item of exchanges) {
              const exchange: IExchange = item;
              if (this._exchanges.has(exchange.mic)) {
                log.warn('mic[%s] has already been inserted.', exchange.mic);
              }
              this._exchanges.set(exchange.mic, exchange);
            }
            log.info('Exchange-Store started - %d exchanges read.', this._exchanges.size);
            resolver();
          } catch (error) {
            reject(error);
          }
        });

      } catch (error) {
        reject(error);
      }
    });
  }
}
