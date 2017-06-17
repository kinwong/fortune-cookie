import * as log from 'winston';
import parse = require('csv-parse');
import { ICurrency } from '../../imports/api';

/**
 * 
 * @export
 * @class CurrencyService
 */
export class CurrencyService {
  private readonly _currencies: Map<string, ICurrency> =
  new Map<string, ICurrency>();

  public async start(): Promise<void> {
    return new Promise<void>((resolver, reject) => {
      log.info('Currency-Store starting...');
      try {
        // Exposes methods.
        Meteor.methods({
          dataCurrenciesRetrieveAll: (): ICurrency[] => {
            return Array.from<ICurrency>(this._currencies.values());
          },
          dataCurrenciesRetrieve: (code: string): ICurrency => {
            return this._currencies.get(code);
          }
        });

        const csv = Assets.getText('currencies.csv');
        parse(csv, { columns: true, comment: '#' }, (error, currencies: ICurrency[]) => {
          for (const item of currencies) {
            const currency: ICurrency = item;
            if (this._currencies.has(currency.code)) {
              log.warn('Currency[%s] has already been inserted.', currency.code);
            }
            this._currencies.set(currency.code, currency);
          }
          log.info('Currency-Store started - %d currencies read.', this._currencies.size);
          resolver();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public stop(): void {
  }
}
