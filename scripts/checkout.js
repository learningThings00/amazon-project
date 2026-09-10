import { renderProductSummary } from './Checkout/productSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.error('Unexpected error:', error);
  }

  renderPaymentSummary();
  renderProductSummary();
}

loadPage();
