import * as log from 'winston';
import * as _ from 'lodash';
import * as Rx from 'rxjs';
import * as Services from './services';

const exchanges = new Services.ExchangeService();
const currencies = new Services.CurrencyService();
const countries = new Services.CountryService();
const spots = new Services.SpotService();
const strategies = new Services.StrategyService();

Meteor.startup(() => {
  log.debug('Attach debugger for server side debugger');

  // if (!Meteor.settings) {
  //   throw new Error('[--setting] must be specified.');
  // }
  // code to run on server at startup
  // Meteor.
  log.info("Fortune-Cookie starting up...");
  startup();
  log.info("Fortune-Cookie is fully started.");
});

function startup() {
  Promise.all([exchanges.start(), currencies.start(), countries.start()]);
  spots.start();
  strategies.start();
}
