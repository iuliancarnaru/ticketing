import '../styles/globals.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const stripePromise = loadStripe(
  'pk_test_51MsW63CCi1T2QrCqjQz2HeRiZNRz8teLRgE7hZ89PxtJpkatxKKjhqw67LY6rHT9EvtfEXOSUTQyh5WEEvIaSItx00xj3gBR6j'
);

const AppComponent = ({ Component, pageProps, currentUser }) => {
  const appearance = {
    theme: 'stripe',
  };

  const options = {
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </Elements>
  );
};

// initial props for app
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};

  // initial props for individual pages
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return { ...data, pageProps };
};

export default AppComponent;
