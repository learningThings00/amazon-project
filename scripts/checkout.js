import { cart, updateCart, updateStorage } from '../data/cart.js';
import { products } from '../data/products.js';
import { currencyFormat } from './utils/money.js';
import { updateCartQuantity } from './utils/cart-quantity.js';

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

function renderCart() {
  let cartHTML = cart
    .map((cartItem) => {
      let id = cartItem.id;

      const matchingItem = products.find((product) => product.id === id);

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
                <div>Quantity: <span class="js-item-quantity-${cartItem.id}">${cartItem.quantity}</span></div>
                <div class="update-cart js-update-cart js-update-cart-${cartItem.id}" data-id="${cartItem.id}">Update</div>
                <div class="edit-quantity js-edit-quantity-${cartItem.id}">
                  <input type="number" class="quantity-input js-quantity-input-${cartItem.id}" value="${cartItem.quantity}" />
                  <span class="save-cart js-save-quantity js-save-quantity-${cartItem.id}" data-id="${cartItem.id}">Save</span>
                </div>
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

  deleteCartItems();
  updateCartItems();
  saveQuantity();
  updateCartQuantity();
}
