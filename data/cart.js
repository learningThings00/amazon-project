import { deliveryOptions } from './deliveryOptions.js';

export let cart = [];
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(id, quantity) {
  const matchingItem = cart.find((cartItem) => cartItem.id === id);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id,
      quantity,
      deliveryOptionId: 1
    });
  }
  updateStorage();
}

export function updateStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteCartItem(deleteId) {
  cart = cart.filter((cartItem) => cartItem.id !== deleteId);
  updateStorage();
}

export function updateCartOptions(id, deliveryOptionId) {
  const matchingItem = cart.find((cartItem) => id === cartItem.id);
  const optionId = Number(deliveryOptionId);

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
