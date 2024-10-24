import { Order } from './types';
import { URL } from './url';

export const sendOrder = async (orderData: Order) => {
  const response = await fetch(`${URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return;
};
