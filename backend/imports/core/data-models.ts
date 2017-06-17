// import {} from '';
import { MeteorObservable, MongoObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';

export const activities = new MongoObservable.Collection('activities');
export const trades = new MongoObservable.Collection('trades');
