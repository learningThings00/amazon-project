import { cart } from '../../data/cart.js';

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => (cartQuantity += cartItem.quantity));

  document.querySelector('.js-cart-quantity').innerText = cartQuantity;
}
