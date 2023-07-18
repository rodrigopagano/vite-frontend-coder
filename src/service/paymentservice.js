import { getHeaders } from '../utils/http';
import AxiosClient from './axiosClient';


export default class PaymentService {
  constructor() {
    this.client = new AxiosClient();
  }
  createPaymentIntent = ({ cartId, callbackSuccess, callbackError }) => {
    const requestInfo = { url: `http://localhost:8080/api/payments/?id=${cartId}`, callbackSuccess, callbackError };

    this.client.makePostRequest({ ...requestInfo });
  };

  pay = ({ body, callbackSuccess, callbackError }) => {
    const requestInfo = { url: `${REACT_APP_BASE_URL}${REACT_APP_PAYMENT_ENDPOINT}/checkout`, body, config: getHeaders(), callbackSuccess, callbackError };
    this.client.makePostRequest(requestInfo);
  };
}
