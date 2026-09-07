import { renderProductSummary } from './Checkout/productSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-oop.js';

new Promise((resolve) => {
  loadProducts(() => resolve('Finished'));
}).then((value) => {
  console.log(value);
  renderPaymentSummary();
  renderProductSummary();
});

/*
loadProducts(() => {
  renderPaymentSummary();
  renderProductSummary();
});
*/
