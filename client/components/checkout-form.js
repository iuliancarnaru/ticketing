import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './card-section';
import useRequest from '../hooks/useRequest';
import Router from 'next/router';

export default function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders'),
  });

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      doRequest({ token: result.token.id });
    }
  };

  return (
    <>
      {errors}
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe}>Confirm order</button>
      </form>
    </>
  );
}
