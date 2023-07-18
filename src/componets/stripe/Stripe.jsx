import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../paymentform/PaymentForm';
import PaymentService from '../../service/paymentservice';
import { useParams } from 'react-router-dom';
import Wrapper from '../wrapper/Wrapper';
import classnames from 'classnames';
import styles from './stripe.module.css';

const key = "pk_test_51NKXYaIqaBB0nrNyEdGrgjiswWKPIuQD3aREyefG6tFVeC0Wh97pseY2eXURZHHKLlPKyo2V9w0xXzMJCT5wY43300KicWK811" 

const stripePromise = loadStripe(key);

const Stripe = () => {
  const [clientSecret, setClientSecret] = useState(null);
    const { cid } = useParams();
   
  useEffect(() => {
    const getClientSecret = async () => {
      const service = new PaymentService();
      service.createPaymentIntent({ cartId: cid, callbackSuccess: callbackSuccessPaymentIntent, callbackError: callbackErrorPaymentIntent });
    };
    

    cid && getClientSecret();
  }, [cid]);

  const callbackSuccessPaymentIntent = (res) => {
       setClientSecret(res.data.payload.client_secret);
  };

  const callbackErrorPaymentIntent = (err) => {
    console.log(err);
  };
  return (
    <>
       <div className={styles.container}>
        <h1 className={styles.title}>Stripe</h1>
      </div>
      <div className={classnames([styles.container, styles.highlighted])}>
        <Wrapper hidden={!clientSecret || !stripePromise}>
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <PaymentForm />
          </Elements>
        </Wrapper>
      </div>
    </>
  );
};
export default Stripe;
