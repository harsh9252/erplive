import { apiRequest } from './apiClient';
import { cleanParams } from './apiUtils';

export const getCurrencies = async () =>
  apiRequest({
    url: '/api/currencies',
    method: 'GET',
  });

export const createCurrency = async (data) =>
  apiRequest({
    url: '/api/currencies',
    method: 'POST',
    data,
  });

export const updateExchangeRate = async (code, exchange_rate) =>
  apiRequest({
    url: '/api/currencies/rate',
    method: 'PUT',
    data: { code, exchange_rate },
  });

export const convertCurrency = async (from_currency, to_currency, amount) =>
  apiRequest({
    url: '/api/currencies/convert',
    method: 'GET',
    params: cleanParams({ from_currency, to_currency, amount }),
  });

const currencyService = {
  getCurrencies,
  createCurrency,
  updateExchangeRate,
  convertCurrency,
};

export default currencyService;
