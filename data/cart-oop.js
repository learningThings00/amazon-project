class Cart {
  cartItem = [];
  #localStorageKey = '';

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItem =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  addToCart(id, quantity) {
    const matchingItem = this.cartItem.find((cartItem) => cartItem.id === id);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        id,
        quantity,
        deliveryOptionId: 1
      });
    }
    this.updateStorage();
  }

  updateStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  deleteCartItem(deleteId) {
    this.cartItem = this.cartItem.filter(
      (cartItem) => cartItem.id !== deleteId
    );
    this.updateStorage();
  }

  updateCartOptions(id, deliveryOptionId) {
    const matchingItem = this.cartItem.find((cartItem) => id === cartItem.id);

    if (!matchingItem) {
      return;
    }

    matchingItem.deliveryOptionId = Number(deliveryOptionId);

    this.updateStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
