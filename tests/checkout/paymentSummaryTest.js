import { renderPaymentSummary } from '../../scripts/Checkout/paymentSummary.js';
import { loadFromStorage } from '../../data/cart.js';
import { loadProductsFetch } from '../../data/products.js';

describe('test suite: renderPaymentSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll(async () => {
    await loadProductsFetch();
  });

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-payment-summary"></div>
      `;

    loadFromStorage();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  function setupCart(item) {
    spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(item));
  }

  it('adds total number of item', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '2' },
      { ProductId: productId2, quantity: 2, deliveryOptionId: '3' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-item-quantity').innerText).toEqual('3');
  });

  it('shows 0 as shipping when deliveryOptionId is 1', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '1' },
      { productId: productId2, quantity: 2, deliveryOptionId: '1' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-shipping-price').innerText).toEqual(
      '$0.00'
    );
  });

  it('sums all paid shipping across mixed delivery option', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '2' },
      { productId: productId2, quantity: 2, deliveryOptionId: '3' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-shipping-price').innerText).toEqual(
      '$14.98'
    );
  });

  it('calculates tax of all items and shipping', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '2' },
      { productId: productId2, quantity: 2, deliveryOptionId: '3' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-tax-price').innerText).toEqual('$6.78');
  });

  it('sums all the changes and shows final price', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '2' },
      { productId: productId2, quantity: 2, deliveryOptionId: '3' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-total-price').innerText).toEqual(
      '$74.56'
    );
  });

  it('shows faded button when cart is empty', () => {
    setupCart([]);
    loadFromStorage();

    renderPaymentSummary();

    expect(
      document
        .querySelector('.js-place-order')
        .classList.contains('order-button')
    ).toBe(false);
  });

  it('shows highlighted button when cart has items', () => {
    setupCart([
      { proudctId: productId1, quantity: 1, deliveryOptionId: '2' },
      { productId: productId2, quantity: 2, deliveryOptionId: '3' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(
      document
        .querySelector('.js-place-order')
        .classList.contains('order-button')
    ).toBe(true);
  });

  it('falls back to free shipping if a cart item has an unrecognised deliveryOptionId', () => {
    setupCart([
      { productId: productId1, quantity: 1, deliveryOptionId: '67' },
      { productId: productId2, quantity: 2, deliveryOptionId: '1' }
    ]);
    loadFromStorage();

    renderPaymentSummary();

    expect(document.querySelector('.js-shipping-price').innerText).toEqual(
      '$0.00'
    );
  });
});
