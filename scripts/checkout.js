import {
  cart,
  updateCart,
  updateCartOptions,
  updateStorage
} from '../data/cart.js';
import { products } from '../data/products.js';
import { currencyFormat } from './utils/money.js';
import { updateCartQuantity } from './utils/cart-quantity.js';
import { deliveryOptions } from '../data/delivery-options.js';
import { dateFormat } from './utils/date-format.js';

renderCart();

function deleteCartItems() {
  document.querySelectorAll('.js-delete-item').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const deleteId = deleteButton.dataset.id;
      updateCart(deleteId);
      renderCart();
      updateStorage();
    });
  });
}

function updateCartItems() {
  document.querySelectorAll('.js-update-cart').forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const updateId = updateButton.dataset.id;

      document
        .querySelector(`.js-edit-quantity-${updateId}`)
        .classList.add('visible');
      document
        .querySelector(`.js-update-cart-${updateId}`)
        .classList.add('not-visible');
      document
        .querySelector(`.js-item-quantity-${updateId}`)
        .classList.add('not-visible');
    });
  });
}

function saveQuantity() {
  document.querySelectorAll('.js-save-quantity').forEach((saveButton) => {
    saveButton.addEventListener('click', () => {
      const saveId = saveButton.dataset.id;

      const matchingItem = cart.find((cartItem) => cartItem.id === saveId);
      const quantity = document.querySelector(`.js-quantity-input-${saveId}`);
      const value = Number(quantity.value);
      if (value === 0) {
        updateCart(matchingItem.id);
        renderCart();
        updateStorage();
      } else if (value < 0 || value >= 100) {
        alert('Not a Valid Quantity');
      } else {
        matchingItem.quantity = Number(quantity.value);
        renderCart();
        updateStorage();
      }
    });
  });
}

function dateOptions(cartItem) {
  let deliveryOptionHTML = deliveryOptions
    .map((deliveryOption) => {
      const deliveryString =
        deliveryOption.id === 1
          ? 'FREE'
          : `$${currencyFormat(deliveryOption.deliveryPrice)} -`;

      const isChecked =
        Number(cartItem.deliveryOptionId) === deliveryOption.id
          ? 'checked'
          : '';

      const dateString = dateFormat(deliveryOption);

      return `<div class="option-row js-option-row"
          data-id="${cartItem.id}"
          data-delivery-option-id="${deliveryOption.id}">
                <input
                  type="radio"
                  value="Tuesday, May 12"
                  name="delivery-option-${cartItem.id}"
                  ${isChecked}
                />
                <div>
                  <div class="expected-date">${dateString}</div>
                  <div class="shipping-cost"> ${deliveryString} Shipping</div>
                </div>
              </div>`;
    })
    .join('');

  return deliveryOptionHTML;
}

function renderCart() {
  let cartHTML = cart
    .map((cartItem) => {
      let id = cartItem.id;

      const option = deliveryOptions.find(
        (value) => value.id === Number(cartItem.deliveryOptionId)
      );

      const dateString = dateFormat(option);

      const matchingItem = products.find((product) => product.id === id);

      return `<div class="order-product-card">
          <div class="delivery-date">Delivery date: ${dateString}</div>
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
                <div>Quantity: <span class="js-item-quantity-${id}">${cartItem.quantity}</span></div>
                <div class="update-cart js-update-cart js-update-cart-${id}" data-id="${id}">Update</div>
                <div class="edit-quantity js-edit-quantity-${id}">
                  <input type="number" class="quantity-input js-quantity-input-${id}" value="${cartItem.quantity}" name="quantity-${id}" />
                  <span class="save-cart js-save-quantity js-save-quantity-${id}" data-id="${id}">Save</span>
                </div>
                <div class="delete-cart js-delete-item" data-id="${id}">Delete</div>
              </div>
            </div>
          </div>

          <div>
            <div class="option-title">Choose a delivery option:</div>
            <div class="delivery-date-select">
                   ${dateOptions(cartItem)}        
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

  document.querySelectorAll('.js-option-row').forEach((optionElement) => {
    optionElement.addEventListener('click', () => {
      const { id, deliveryOptionId } = optionElement.dataset;
      updateCartOptions(id, deliveryOptionId);
      renderCart();
    });
  });

  deleteCartItems();
  updateCartItems();
  saveQuantity();
  updateCartQuantity();
}
