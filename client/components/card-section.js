import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: '#222',
      color: '#222',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#222',
      },
    },
    invalid: {
      iconColor: 'orangered',
      color: '#orangered',
    },
  },
};

function CardSection() {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}
export default CardSection;
