/**
 * Use the CSS tab above to style your Element's container.
 */
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './card-section.module.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
};

function CardSection() {
  return (
    <div style={{ width: '400px' }}>
      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}
export default CardSection;
