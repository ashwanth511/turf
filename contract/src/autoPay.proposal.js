import { AmountMath } from '@agoric/ertp';

const startSubscriptionProposal = (paymentAmount, paymentNotifier) => {
  return {
    give: { [paymentAmount.brand]: AmountMath.make(paymentAmount.value) }, // User offers the payment amount
    want: { [paymentAmount.brand]: AmountMath.make(paymentAmount.value) }, // User expects payment to be made
    exit: { onDemand: null }, // Exit condition when user wants to cancel the proposal
    actions: {
      startSubscription: async (userSeat, zcf) => {
        // Interact with the contract to start a new subscription
        const subscriptionId = await zcf.getPublicFacet().startSubscription(userSeat);
        return subscriptionId; // Return the subscriptionId
      },
      cancelSubscription: async (subscriptionId, zcf) => {
        // Interact with the contract to cancel an existing subscription
        const success = await zcf.getPublicFacet().cancelSubscription(subscriptionId);
        return success; // Return cancellation success status
      }
    },
    notifier: paymentNotifier // Provide the notifier for tracking the subscription status
  };
};
