export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(id) {
  const itemQuantity = document.querySelector(`.js-quantity-selector-${id}`);
  const quantity = Number(itemQuantity.value);

  const matchingItem = cart.find((cartItem) => cartItem.id === id);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id,
      quantity
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
