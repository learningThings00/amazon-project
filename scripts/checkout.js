import { renderProductSummary } from './Checkout/productSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-oop.js';

loadProducts(() => {
  renderPaymentSummary();
  renderProductSummary();
});
