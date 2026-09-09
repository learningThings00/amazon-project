import { deliveryOptions } from './deliveryOptions.js';

export let cart = [];
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(productId, quantity) {
  const matchingItem = cart.find((cartItem) => cartItem.id === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  updateStorage();
}

export function updateStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteCartItem(deleteId) {
  cart = cart.filter((cartItem) => cartItem.productId !== deleteId);
  updateStorage();
}

export function updateCartOptions(id, deliveryOptionId) {
  const matchingItem = cart.find((cartItem) => id === cartItem.productId);
  const optionId = deliveryOptionId;

  if (!matchingItem) {
    return;
  }

  const option = deliveryOptions.find((opt) => optionId === opt.id);

  if (!option) {
    return;
  }

  matchingItem.deliveryOptionId = optionId;

  updateStorage();
}
