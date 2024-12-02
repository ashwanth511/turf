import { Far } from '@endo/far';
import { AmountMath } from '@agoric/ertp';
import { makeNotifierKit } from '@agoric/notifier';
import { makeTimerService } from '@agoric/zoe/src/zoeService';

export const start = async (zcf) => {
  const { paymentAmount } = zcf.getTerms();
  const timer = await makeTimerService(zcf);
  const { notifier, updater } = makeNotifierKit();
  
  // Track active subscriptions
  const activeSubscriptions = new Map();
  
  const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000;
  const GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1000; // 3 days grace period

  const processPayment = async (subscriptionId, userSeat) => {
    const subscription = activeSubscriptions.get(subscriptionId);
    
    if (!subscription) return;

    try {
      // Attempt to collect payment
      const payment = await userSeat.getPayment(paymentAmount);
      
      if (payment) {
        // Payment successful
        subscription.lastPaymentDate = Date.now();
        subscription.status = 'active';
        updater.updateState({
          subscriptionId,
          status: 'payment_successful',
          nextPaymentDate: subscription.lastPaymentDate + MONTH_IN_MS
        });
      } else {
        // Payment failed
        subscription.status = 'payment_failed';
        subscription.retryCount += 1;
        
        if (subscription.retryCount > 3) {
          subscription.status = 'suspended';
          activeSubscriptions.delete(subscriptionId);
        }
        
        updater.updateState({
          subscriptionId,
          status: subscription.status,
          retryCount: subscription.retryCount
        });
      }
    } catch (error) {
      subscription.status = 'error';
      updater.updateState({
        subscriptionId,
        status: 'error',
        error: error.message
      });
    }
  };

  const scheduleNextPayment = (subscriptionId) => {
    const subscription = activeSubscriptions.get(subscriptionId);
    
    timer.setTimeout(() => {
      processPayment(subscriptionId, subscription.userSeat);
      
      if (subscription.status === 'active') {
        scheduleNextPayment(subscriptionId);
      }
    }, MONTH_IN_MS);
  };

  const startSubscription = (userSeat) => {
    const subscriptionId = `sub_${Date.now()}`;
    
    activeSubscriptions.set(subscriptionId, {
      userSeat,
      status: 'active',
      startDate: Date.now(),
      lastPaymentDate: Date.now(),
      retryCount: 0
    });

    scheduleNextPayment(subscriptionId);
    
    return subscriptionId;
  };

  const cancelSubscription = (subscriptionId) => {
    const subscription = activeSubscriptions.get(subscriptionId);
    
    if (subscription) {
      subscription.status = 'cancelled';
      activeSubscriptions.delete(subscriptionId);
      
      updater.updateState({
        subscriptionId,
        status: 'cancelled',
        cancelDate: Date.now()
      });
      
      return true;
    }
    return false;
  };

  const publicFacet = Far('RecurringPayments', {
    startSubscription,
    cancelSubscription,
    getSubscriptionStatus: (subscriptionId) => activeSubscriptions.get(subscriptionId),
    getNotifier: () => notifier
  });

  return harden({ publicFacet });
};

harden(start);
