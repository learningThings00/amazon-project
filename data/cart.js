export const cart = [];

export function addToCart(id) {
  let matchingItem;

  const itemQuantity = document.querySelector(`.js-quantity-selector-${id}`);
  const quantity = Number(itemQuantity.value);

  cart.forEach((cartItem) => {
    if (id === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      id,
      quantity
    });
  }
}
