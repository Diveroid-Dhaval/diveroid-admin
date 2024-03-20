import { Subscription } from 'rxjs';

export function AutoUnsubscribe(target: Function) {

  const originalOnDestroy = target.prototype.ngOnDestroy;
  let subscriptions = new Subscription();

  Object.defineProperty(target.prototype, 'subscriptionRefs', {
    set: function (sub: Subscription) { subscriptions.add(sub) }
  })

  target.prototype.ngOnDestroy = function () {

    subscriptions.unsubscribe();
    subscriptions = new Subscription();

    if (originalOnDestroy) {
      originalOnDestroy.apply(this, arguments);
    }
  };
}
