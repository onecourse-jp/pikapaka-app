import * as types from './types';

export function waitingPayment(isWaiting) {
  return {
    type: types.WAITING_PAYMENT,
    payload: { isWaiting: isWaiting },
  };
}
