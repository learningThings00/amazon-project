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
  const price = totalPrice();
  const shipping = calculateShipping();
  const beforeTax = price + shipping;
  const tax = beforeTax * 0.1;
  const afterTax = beforeTax + tax;
  let paymentSummaryHTML = `
  <div class="summary-title">Order Summary</div>
        <div class="summary-row">
          <div>Items (<span class="js-item-quantity"></span>):</div>
          <div class="price">$${currencyFormat(price)}</div>
        </div>

        <div class="summary-row">
          <div>Shipping & handling:</div>
          <div class="price js-shipping-price">$${currencyFormat(shipping)}</div>
        </div>

        <div class="summary-row">
          <div>Total before tax:</div>
          <div class="price sub-total">$${currencyFormat(beforeTax)}</div>
        </div>

        <div class="summary-row">
          <div>Estimate tax (<span>10%</span>):</div>
          <div class="price">$${currencyFormat(tax)}</div>
        </div>

        <hr />

        <div class="summary-row total-row">
          <div>Order total:</div>
          <div class="price js-total-price">$${currencyFormat(afterTax)}</div>
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
