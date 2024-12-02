// Example usage
const startSubscription = async (userSeat) => {
    const terms = {
      paymentAmount: AmountMath.make(paymentBrand, 100n) // Monthly payment amount
    };
  
    const installation = await E(zoe).install(contract);
    const { publicFacet } = await E(zoe).startInstance(installation, terms);
  
    const subscriptionId = await E(publicFacet).startSubscription(userSeat);
    
    // Monitor subscription status
    const notifier = await E(publicFacet).getNotifier();
    notifier.subscribe(status => {
      console.log('Subscription status:', status);
    });
  
    return subscriptionId;
  };
  