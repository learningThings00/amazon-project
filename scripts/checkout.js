import { cart, updateCart, updateStorage } from '../data/cart.js';
import { products } from '../data/products.js';
import { currencyFormat } from './utils/money.js';

renderCart();

let hello = cart;

function renderCart() {
  let cartHTML = cart
    .map((cartItem) => {
      let id = cartItem.id;
      let matchingItem;

      products.forEach((product) => {
        if (product.id === id) {
          matchingItem = product;
        }
      });
      return `<div class="order-product-card">
          <div class="delivery-date">Delivery date: Tuesday, May 12</div>
          <div class="product-description">
            <img
              src="${matchingItem.image}"
              alt="${matchingItem.alt}"
              class="product-image"
            />
            <div>
              <div class="product-name">
               ${matchingItem.name}
              </div>
              <div class="product-price">$${currencyFormat(matchingItem.priceCents)}</div>
              <div class="quantity-row">
                <div>Quantity: <span>${cartItem.quantity}</span></div>
                <div class="update-cart">Update</div>
                <div class="delete-cart js-delete-item" data-id="${cartItem.id}">Delete</div>
              </div>
            </div>
          </div>

          <div>
            <div class="option-title">Choose a delivery option:</div>
            <div class="delivery-date-select">
              <div class="option-row">
                <input
                  type="radio"
                  value="Tuesday, May 12"
                  name="delivery-option-${cartItem.id}"
                />
                <div>
                  <div class="expected-date">Tuesday, May 12</div>
                  <div class="shipping-cost">FREE Shipping</div>
                </div>
              </div>

              <div class="option-row">
                <input
                  type="radio"
                  value="Wednesday, May 6"
                  name="delivery-option-${cartItem.id}"
                />
                <div>
                  <div class="expected-date">Wednesday, May 6</div>
                  <div class="shipping-cost">$4.99 - Shipping</div>
                </div>
              </div>

              <div class="option-row">
                <input type="radio" value="Monday, May 4" name="delivery-option-${cartItem.id}" />
                <div>
                  <div class="expected-date">Monday, May 4</div>
                  <div class="shipping-cost">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join('');

  if (cart.length === 0) {
    document.querySelector('.js-cart-list').innerHTML =
      `<div class="empty-cart-message">
    <div>Your cart is empty.</div>
    <a href="/">
    <button class="view-products">View products</button>
    </a>
    </div>`;
    document.querySelector('.js-place-order').classList.remove('order-button');
  } else {
    document.querySelector('.js-cart-list').innerHTML = cartHTML;
    document.querySelector('.js-place-order').classList.add('order-button');
  }

  document.querySelectorAll('.js-delete-item').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const deleteId = deleteButton.dataset.id;
      updateCart(deleteId);
      renderCart();
      updateStorage();
    });
  });
}
