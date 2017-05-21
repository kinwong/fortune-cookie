import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

Meteor.startup(() => {
  // enableProdMode();
    const subscription =
      MeteorObservable.autorun().subscribe(() => {
    if (Meteor.loggingIn()) {
      return;
    }
    // tslint:disable-next-line:no-console
    console.log('Meteor client bootstrapped and started.');
  });
});
