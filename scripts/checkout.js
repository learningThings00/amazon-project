import { renderProductSummary } from './Checkout/productSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
//import '../data/cart-oop.js';

async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected errror. Please try again later.');
  }

  renderPaymentSummary();
  renderProductSummary();
}

loadPage();

// loadProductsFetch().then(() => {
//   renderPaymentSummary();
//   renderProductSummary();
// });

/*
new Promise((resolve) => {
  loadProducts(() => resolve('Finished'));
}).then((value) => {
  console.log(value);
  renderPaymentSummary();
  renderProductSummary();
});
*?

/*
loadProducts(() => {
  renderPaymentSummary();
  renderProductSummary();
});
*/
