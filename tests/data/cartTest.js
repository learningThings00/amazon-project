import {
  addToCart,
  cart,
  deleteCartItem,
  loadFromStorage,
  updateCartOptions
} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });
  it('adds existing item to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: 1
        }
      ])
    );

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: 1
        }
      ])
    );
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
  it('adds new item to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: 1
        }
      ])
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: updateCartOptions', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: 1
        },
        {
          id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: 2
        }
      ])
    );

    loadFromStorage();
  });
  it('does nothing if the product is not in the cart', () => {
    updateCartOptions('xyz', 3);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the cart deliveryOptionId is incorrect', () => {
    updateCartOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 4);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart[0].deliveryOptionId).toEqual(1);
  });

  it('update the delivery option when the product and option both exist', () => {
    updateCartOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 3);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].deliveryOptionId).toEqual(3);
  });
});

describe('test suite: deleteCartItem', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() =>
      JSON.stringify([
        {
          id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: 1
        },
        {
          id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: 2
        }
      ])
    );

    loadFromStorage();
  });

  it('removes the matching item from the cart', () => {
    deleteCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('leaves other items in the cart untouched', () => {
    deleteCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('saves the cart unchanged if the id is not found', () => {
    deleteCartItem('not an id');
    expect(cart.length).toEqual(2);
    expect(cart[0].id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
