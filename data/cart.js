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

export function updateCart(deleteId) {
  cart = cart.filter((cartItem) => {
    return deleteId !== cartItem.id;
  });
}

export function updateCartOptions(id, deliveryOptionId) {
  const matchingItem = cart.find((cartItem) => id === cartItem.id);
  matchingItem.deliveryOptionId = Number(deliveryOptionId);

  updateStorage();
}
