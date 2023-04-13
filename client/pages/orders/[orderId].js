import { useState, useEffect } from 'react';
import CheckoutForm from '../../components/checkout-form';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    // clear interval when leaving page
    return () => clearInterval(timerId);
  }, []);

  if (timeLeft < 0) {
    return (
      <div>
        <h1>Order expired</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Time left to pay: {timeLeft} seconds</h1>
      <CheckoutForm order={order} />
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
