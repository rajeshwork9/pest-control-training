import axios, { Axios, AxiosProgressEvent } from 'axios';
import axiosInstance from '../interceptors/ApiInterceptor';

import { formatDateTime } from '../utils/dateTimeUtils';
import { useIonLoading } from '@ionic/react';
import { useState } from 'react';
import { Http, HttpOptions } from '@capacitor-community/http';
import { CapacitorHttp } from '@capacitor/core';

const apiUrl: any = import.meta.env.VITE_PAYMENT_GATEWAY_URL;
const merchantId: any = import.meta.env.VITE_MERCHANT_ID;
const baseUrl: any = import.meta.env.VITE_API_URL;

export const createSession = async (amount: any, orderId: any) => {
  try {
    const url = apiUrl + 'api/rest/version/100/merchant/' + merchantId + '/session'; // Your endpoint URL
    const payload = {
      "apiOperation": "INITIATE_CHECKOUT",
      "checkoutMode": "WEBSITE",
      "interaction": {
        "operation": "PURCHASE",
        "merchant": {
          "name": "PSD Training App",
          "url": "https://www.your.site.url.com"
        },
        "returnUrl": "http://localhost/payment-confirmation"
      },
      "order": {
        "currency": "AED",
        "amount": amount,
        "id": orderId,
        "description": "Goods and Services"
      }
    }

    // Create HTTP POST request options
    const options: HttpOptions = {
      url: url,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic bWVyY2hhbnQuVEVTVFJBS1BVQkxJQ1RTVDo0MTdhNDVhNjMzOTEwZWFiZjMyNjExMmNkN2JiNmQ4Nw==`,
      },
      data: payload
    };

    // Send HTTP request using Capacitor Http plugin
    const response = await CapacitorHttp.post(options);

    // Handle the response
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
}
export const checkPaymentStatus = async (orderId: any) => {
  try {
    const url = apiUrl + 'api/rest/version/100/merchant/' + merchantId + '/order/' + orderId; // Your endpoint URL

    // Create HTTP POST request options
    const options: HttpOptions = {
      url: url,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Basic bWVyY2hhbnQuVEVTVFJBS1BVQkxJQ1RTVDo0MTdhNDVhNjMzOTEwZWFiZjMyNjExMmNkN2JiNmQ4Nw==`,
      },
    };

    // Send HTTP request using Capacitor Http plugin
    const response = await CapacitorHttp.get(options);

    // Handle the response
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
}
export const generateOrderId = () => {
  const randomPart = Math.random().toString(36).substring(2, 8); // Random alphanumeric
  return `orderrrr-${Date.now()}-${randomPart}`;
};
export const createPurchase = async (amount: any, orderId: any) => {
  try {
    const url = baseUrl + 'v1/checkout-purchase-mobile'; // Your endpoint URL
    const payload = {
      order_number: orderId,
      transaction_amount: amount
    };

    // Create HTTP POST request options
    const options: HttpOptions = {
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    };

    // Send HTTP request using Capacitor Http plugin
    const response = await CapacitorHttp.post(options);

    // Handle the response
    console.log('Response:', response);
    return response.data.data;
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
}
export const getCheckoutDetails = async (orderId: any, checkoutId: any) => {
  try {
    const url = baseUrl + 'v1/checkout-details'; // Your endpoint URL
    const payload = {
      order_id: orderId,
      checkout_id: checkoutId
    };
    // Create HTTP POST request options
    const options: HttpOptions = {
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    };

    // Send HTTP request using Capacitor Http plugin
    const response = await CapacitorHttp.post(options);

    // Handle the response
    console.log('Response:', response);
    return response.data.data.response;
  } catch (error) {
    console.error('Error sending form data:', error);
    throw error;
  }
}
