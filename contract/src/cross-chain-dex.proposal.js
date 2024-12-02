import { Far } from '@endo/far';
import { AmountMath } from '@agoric/ertp';
import { makeICAConnection } from '@agoric/inter-protocol';

export const start = async (zcf) => {
  // Set up ICA connection to Cosmos
  const icaConnection = await makeICAConnection(zcf, {
    connectionId: 'connection-0',
    portId: 'icacontroller-1',
    counterpartyChainId: 'cosmoshub-4'
  });

  const performSwap = async (fromToken, toToken, amount) => {

    const swapTx = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: icaConnection.getAddress(),
        toAddress: 'cosmos-dex-address',
        amount: [{
          denom: fromToken,
          amount: amount.toString()
        }]
      }
    };


    const result = await icaConnection.submitTx(swapTx);
    return result;
  };

  const publicFacet = Far('CrossChainDEX', {
    swap: async (params) => {
      const {
        inputToken,
        outputToken,
        amount,
        minReceived
      } = params;


      const balance = await icaConnection.queryBalance(inputToken);
      if (AmountMath.isGTE(balance, amount)) {
        return performSwap(inputToken, outputToken, amount);
      }
      throw new Error('Insufficient balance');
    },

    getQuote: async (inputToken, outputToken, amount) => {
   
      const quote = await icaConnection.queryContract({
        address: 'cosmos-dex-address',
        query: {
          get_quote: {
            input_token: inputToken,
            output_token: outputToken,
            amount: amount.toString()
          }
        }
      });
      return quote;
    },

    getBalance: (token) => icaConnection.queryBalance(token)
  });

  return harden({ publicFacet });
};

harden(start);
