import { cart } from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { products } from '../../data/products.js';
import { updateCartQuantity } from '../utils/cartQuantity.js';
import { currencyFormat } from '../utils/money.js';

function totalPrice() {
  const totalItemPriceCents = cart.reduce((acc, curr) => {
    let matchingProduct = products.find((product) => product.id === curr.id);
    return acc + matchingProduct.priceCents * curr.quantity;
  }, 0);
  return totalItemPriceCents;
}

function calculateShipping() {
  const totalShippingCents = cart.reduce((acc, curr) => {
    let matchingOption =
      deliveryOptions.find((option) => curr.deliveryOptionId === option.id) ||
      deliveryOptions[0];
    return acc + matchingOption.deliveryPrice;
  }, 0);
  return totalShippingCents;
}

export function renderPaymentSummary() {
  calculateShipping();
  let taxCents = (totalPrice() + calculateShipping()) * 0.1;
  let paymentSummaryHTML = `
  <div class="summary-title">Order Summary</div>
        <div class="summary-row">
          <div>Items (<span class="js-item-quantity"></span>):</div>
          <div class="price">$${currencyFormat(totalPrice())}</div>
        </div>

        <div class="summary-row">
          <div>Shipping & handling:</div>
          <div class="price">$${currencyFormat(calculateShipping())}</div>
        </div>

        <div class="summary-row">
          <div>Total before tax:</div>
          <div class="price sub-total">$${currencyFormat(totalPrice() + calculateShipping())}</div>
        </div>

        <div class="summary-row">
          <div>Estimate tax (<span>10%</span>):</div>
          <div class="price">$${currencyFormat(taxCents)}</div>
        </div>

        <hr />

        <div class="summary-row total-row">
          <div>Order total:</div>
          <div class="price">$${currencyFormat(taxCents + totalPrice() + calculateShipping())}</div>
        </div>

        <button class="empty-cart-order-button js-place-order">
          Place your order
        </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  if (cart.length !== 0) {
    document.querySelector('.js-place-order').classList.add('order-button');
  } else {
    document.querySelector('.js-place-order').classList.remove('order-button');
  }

  document.querySelector('.js-item-quantity').innerText = updateCartQuantity();
}
