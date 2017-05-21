import { Mongo } from 'meteor/mongo';
import { MongoObservable } from 'meteor-rxjs';

export const dataExchangesRetrieveAll = 'dataExchangesRetrieveAll';
export const dataExchangeRetrieve = 'dataExchangeRetrieve';

export const dataCurrenciesRetrieveAll = 'dataCurrenciesRetrieveAll';
export const dataCurrenciesRetrieve = 'dataCurrenciesRetrieve';

export const dataMarketSpot = 'dataMarketSpot';

export const activities = new Mongo.Collection('activities');
export const activitiesObservable = new MongoObservable.Collection(activities);

export const strategies = new Mongo.Collection('strategies');
export const strategiesObservable = new MongoObservable.Collection(strategies);

strategies.allow({
    insert: () => true,
    update: () => true,
    remove: () => true
});
