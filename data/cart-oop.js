function Cart(localStorageKey) {
  const cart = {
    cartItem: [],

    loadFromStorage() {
      this.cartItem = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },

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
    },

    updateStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },

    deleteCartItem(deleteId) {
      this.cartItem = this.cartItem.filter(
        (cartItem) => cartItem.id !== deleteId
      );
      this.updateStorage();
    },

    updateCartOptions(id, deliveryOptionId) {
      const matchingItem = this.cartItem.find((cartItem) => id === cartItem.id);

      if (!matchingItem) {
        return;
      }

      matchingItem.deliveryOptionId = Number(deliveryOptionId);

      this.updateStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
